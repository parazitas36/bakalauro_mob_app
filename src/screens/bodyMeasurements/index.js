import { Button } from '@rneui/base';
import {Card, FAB, Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import { Image, View } from 'react-native';
import {FlatList} from 'react-native';
import {Animated} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {LoadingScreen, RegularUserContext, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import BodyMeasurementsItem from '../../components/bodyMeasurementsItem';
import Resources from '../../Resources';
import styles from './styles';

const BodyMeasurements = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const [bodyMeasurements, setBodyMeasurements] = useState(null);

  if (userData.role === 'User') {
    const {reloadBodyMeasurementsState} = useContext(RegularUserContext);
    const [reloadBodyMeasurements, setReloadBodyMeasurements] = reloadBodyMeasurementsState;

    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants().BodyMeasurements,
          token: token,
        });
        console.log(resp);
  
        if (resp.status === 200) {
          const data = await resp.json();
          console.log(data);
  
          setBodyMeasurements(data);
        } else {
          setBodyMeasurements([]);
        }
      })();
      
      setReloadBodyMeasurements(false);
    }, [reloadBodyMeasurements === true]);
  }

  return (
    <Animated.View style={styles({theme: theme}).view}>
      <Text h4 style={{marginVertical: verticalScale(5)}}>Your body measurements</Text>
      {bodyMeasurements === null ? LoadingScreen() : bodyMeasurements?.length > 0 ?
      <>
        <Button
          title='Check your progress'
          containerStyle={{padding: verticalScale(5), width: scale(250)}}
          buttonStyle={{borderRadius: moderateScale(5), height: scale(40)}}
          titleStyle={{fontWeight: 'bold'}}
          onPress={() => navigation.navigate({
            name: 'BodyMeasurementsProgress',
            params: {
              bodyMeasurements: bodyMeasurements
            }
          })}
        />
        <FlatList data={bodyMeasurements} renderItem={({item, index}) => <BodyMeasurementsItem key={index} data={item} theme={theme} />}/>
      </>
        : <Text>You haven't added any body measurements yet.</Text>
      }
      <FAB
        icon={{name: 'add', color: Resources.Colors.IconsColor}}
        color={theme.colors.primary}
        size="md"
        placement="right"
        onPress={() => navigation.navigate({
            name: 'AddBodyMeasurements',
            params: {
                height: bodyMeasurements?.at(-1)?.height ? String(bodyMeasurements?.at(-1)?.height).replace('.', ',') : null
            }
        })}
      />
    </Animated.View>
  );
};

export default BodyMeasurements;
