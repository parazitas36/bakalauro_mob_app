import { useTheme } from '@rneui/themed';
import { countries } from 'country-list-json';
import React, {useState, useMemo, useRef} from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Modal, StyleSheet, View} from 'react-native';
import AutocompleteInput from 'react-native-autocomplete-input';
import { TextInput } from 'react-native-paper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Resources from '../../Resources';

const CountriesModal = props => {
    const [hideResults, setHideResults] = useState(false)
    const [query, setQuery] = useState('')

    const {theme} = useTheme();

    const queryCompare = (first, second) => { return String(first).toLowerCase().includes(second.toLowerCase()) };

    const countriesMemo = useMemo(() => { return countries }, [countries]);
    
    const queriedCountries = useMemo(() => {
        if (query.length < 3) { return [] }
        return countriesMemo?.filter(x => queryCompare(x.name, query));
    }, [query]);
    
    const suggestions = useMemo(() => {
        setHideResults(false);
        if (queriedCountries.length === 0 || (queriedCountries.length === 1 && queryCompare(queriedCountries[0].name, query))) {
            if (queriedCountries.length === 0 && query.length > 2) {
                return [{name: Resources.Texts.NoCountries, flag: null}];
            }
            if(queriedCountries.length === 1 && queryCompare(queriedCountries[0].name, query)) {
                if(props?.country !== queriedCountries[0].name) {
                    props?.setCountry(queriedCountries[0].name)
                    setQuery(queriedCountries[0].name)
                    setHideResults(true);
                    return []
                } else{
                    return queriedCountries
                }
            }
            props?.setCountry(null)
            setHideResults(true);
            return [];
        }
        return queriedCountries;
    }, [queriedCountries, query]);
    
    const HideCountriesList = (e) => {
        if (e.target === e.currentTarget) {
            if (suggestions[0]?.name === Resources.Texts.NoCountries || suggestions.length === 0) {
                setQuery('');
                props?.setCountry(null)
            } else if (suggestions.length === 1 && suggestions[0].name !== Resources.Texts.NoCountries) {
                props?.setCountry(suggestions[0].name);
                setQuery(suggestions[0].name);
            } else {
                setQuery('')
                props?.setCountry(null)
            }
            setHideResults(true);
        }
    };

  return (
    <View style={styles({theme: theme}).centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props?.modalVisible}
        onRequestClose={() => {
          props?.setModalVisible(prev => !prev);
        }}>
        <View style={styles({theme: theme}).container}>
            <View style={styles({theme: theme}).autocompleteContainer}>
                <AutocompleteInput
                data={suggestions}
                value={query}
                inputContainerStyle={styles({theme: theme}).inputContainerStyle}
                style={styles({theme: theme}).autocompleteInput}
                hideResults={hideResults}
                onBlur={e => HideCountriesList(e)}
                onEndEditing={e => HideCountriesList(e)}
                renderTextInput={() => {
                  return <TextInput style={styles({theme: theme}).textInput} 
                                    placeholder={Resources.Placeholders.SelectCountry}
                                    placeholderTextColor={theme.colors.greyOutline} 
                                    value={query}
                                    onChangeText={setQuery}/>
                }}
                flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({item}) => (
                    <TouchableOpacity
                        onPress={() => {
                            if (item.name === Resources.Texts.NoCountries) { return }
                            setQuery(item.name);
                            props?.setCountry(item.name)
                            setHideResults(true)
                        }}>
                        <Text style={{color: theme.mode === 'dark' ? theme.colors.white : theme.colors.black}}>
                          {item.name} {item.flag}
                        </Text>
                    </TouchableOpacity>
                    ),
                    keyboardShouldPersistTaps: 'always',
                }}
                />
          </View>
        </View>
        <TouchableOpacity style={styles({theme: theme}).btn} onPress={() => props?.setModalVisible(false)}>
            <Text style={styles({theme: theme}).btnText}>{Resources.Texts.ConfirmButtonText}</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = ({theme}) => {
  return (
    StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: theme.colors.background,
      },
      container: {
        position: 'relative',
        backgroundColor: theme.mode === 'dark' ? theme.colors.white : theme.colors.black,
        color: 'black',
        flex: 1,
        paddingTop: verticalScale(50),
      },
      autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        padding: scale(5),
        color: 'black'
      },
      btn: {
        position: 'absolute',
        bottom: verticalScale(30),
        alignSelf: 'center',
        width: scale(250),
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: theme.mode === 'dark' ? theme.colors.white : theme.colors.black,
        borderColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
        borderWidth: moderateScale(1)
      },
      btnText: {
        color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      },
      autocompleteInput: {
        borderRadius: moderateScale(5),
        marginHorizontal: scale(5)
      },
      inputContainerStyle: {
        backgroundColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
        borderWidth: 0,
      },
      textInput: {
        color: theme.mode === 'dark' ? theme.colors.white : theme.colors.black,
        backgroundColor: 'none',
      },
      listContainerStyle: {
        backgroundColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
        color: theme.mode === 'dark' ? theme.colors.white : theme.colors.black,
      }
    })
  )
} ;

export default CountriesModal;
