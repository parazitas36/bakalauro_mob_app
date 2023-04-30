import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, { FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp } from 'react-native-reanimated';
import {TextInput} from 'react-native';

import styles from './styles';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import CountriesModal from './countriesModal';
import CustomButton from '../../components/customButton';
import { Validation } from './validation';
import { PostCall } from '../../api/PostCall';
import { ApiConstants } from '../../api/ApiConstants';
import { ToastAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import { PostFormData } from '../../api/PostFormData';
import { useTheme } from '@rneui/themed';

const CreateFacility = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [modalVisible, setModalVisible] = useState(false);

  const {theme} = useTheme();

  const {reloadFacilitiesState} = useContext(SportsClubContext)
  const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;

  const CheckValueAndReturnData = (val) => {
    if (val === undefined || val === null || val === '' || val === 'null') {
      return null;
    } 
    return val;
  }

  const [image, setImage] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(CheckValueAndReturnData(userData?.contactInfo?.phoneNumber));
  const [email, setEmail] = useState(CheckValueAndReturnData(userData?.contactInfo?.email));
  const [validation, setValidation] = useState(null);

  const validationMemo = useMemo(() => {
    return Validation(country, city, address, email, phone);
  }, [country, city, address, email, phone])

  const isFormValid =
    validationMemo !== null &&
    validationMemo?.validCountry === true &&
    validationMemo?.validCity &&
    validationMemo?.validEmail &&
    validationMemo?.validPhone;

  const addImage = async () => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel !== true) {
        const image = result?.assets.at(0);
        if (image) {
          setImage(image);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const SavePress = async() => {
    if (image === null) {
      ToastAndroid.show(
        'You must select the image!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    if (isFormValid) {
      const formData = new FormData();

      formData.append('PhoneNumber', String(phone));
      formData.append('Email', String(email));
      formData.append('Country', String(country));
      formData.append('City', String(city));
      formData.append('Image', {
        uri: String(image.uri),
        type: String(image.type),
        name: String(image.fileName)
    })

      const resp = await PostFormData({
        endpoint: ApiConstants({ids: [roleSpecificData.id]})
          .SportsClubFacilities,
        formData: formData,
        token: token,
      });

      if(resp.status === 201) {
        ToastAndroid.show(
          Resources.Texts.NotificationFacilityCreatedSuccessFully,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setReloadFacilities(true)
        navigation.goBack()
      } else {
        ToastAndroid.show(
          Resources.Texts.NotificationFacilityNotCreated,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } 

    setValidation(validationMemo);
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles({theme: theme}).view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles({theme: theme}).heading}>
          {Resources.Texts.FillFacilityInfo}
        </Animated.Text>
        <CountriesModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setCountry={setCountry}
          country={country}
        />
        <TouchableOpacity onPress={() => setModalVisible(prev => !prev)}>
          <Text style={styles({theme: theme}).countryButton}>
            {country === null ? Resources.Texts.PickCountryText
            : `${Resources.Texts.SelectedCountryText}: ${country}`}
          </Text>
        </TouchableOpacity>
        {validation?.validCountry === false && (
                <Animated.Text
                  style={styles({theme: theme}).errors}
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}>
                {Resources.ValidationMessages.CountryInvalid}
                </Animated.Text>
              )}
        <TextInput
          style={styles({theme: theme}).textInput}
          placeholder={Resources.Placeholders.City}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setCity}
        />
        {validation?.validCity === false && (
              <Animated.Text
                style={styles({theme: theme}).errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.CityInvalid}
              </Animated.Text>
            )}
        <TextInput
          style={styles({theme: theme}).textInput}
          placeholder={Resources.Placeholders.StreetAddress}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setAddress}
        />
        {validation?.validAddress === false && (
              <Animated.Text
                style={styles({theme: theme}).errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.StreetAddressInvalid}
              </Animated.Text>
            )}
        <TextInput
          style={styles({theme: theme}).textInput}
          placeholder={Resources.Placeholders.Email}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setEmail}
          defaultValue={email}
        />
        {validation?.validEmail === false && (
              <Animated.Text
                style={styles({theme: theme}).errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.EmailInvalid}
              </Animated.Text>
            )}
        <TextInput
          style={styles({theme: theme}).textInput}
          placeholder={Resources.Placeholders.Phone}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setPhone}
          defaultValue={phone}
        />
        {validation?.validPhone === false && (
              <Animated.Text
                style={styles({theme: theme}).errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.PhoneNumberInvalid}
              </Animated.Text>
            )}
        {image !== null ? <Image source={{uri: image?.uri}} style={{height: 100, width: 100}} /> : null}
        <CustomButton
          styles={styles({theme: theme})}
          btnText={image === null ? 'Select image' : 'Change image'}
          onPress={async () => await addImage()}
        />
        <CustomButton 
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={async() => await SavePress()}
          styles={styles({theme: theme})}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateFacility;
