import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, { FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp } from 'react-native-reanimated';
import {TextInput} from 'react-native';

import styles from './styles';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import CountriesModal from './countriesModal';
import CustomButton from '../../components/customButton';
import { Validation } from './validation';
import { PostCall } from '../../api/PostCall';
import { ApiConstants } from '../../api/ApiConstants';
import { ToastAndroid } from 'react-native';

const CreateFacility = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [modalVisible, setModalVisible] = useState(false);

  const {reloadFacilitiesState} = useContext(SportsClubContext)
  const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(userData?.contactInfo?.phoneNumber);
  const [email, setEmail] = useState(userData?.contactInfo?.email);
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

  const SavePress = async() => {
    if (isFormValid) {
      const body = {
        "contactInfo": {
          "phoneNumber": phone,
          "email": email
        },
        "country": country,
        "city": city,
        "coordinates": address
      };

      const resp = await PostCall({endpoint: ApiConstants({ids: [roleSpecificData.id]}).SportsClubFacilities, body: body, token: token});

      if(resp.status === 201) {
        ToastAndroid.show(
          Resources.Texts.NotificationFacilityCreatedSuccessFully,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setReloadFacilities(true)
        navigation.navigate(Resources.Screens.SCAdminHome)
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
      <Animated.View style={styles.view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>
          {Resources.Texts.FillFacilityInfo}
        </Animated.Text>
        <CountriesModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setCountry={setCountry}
          country={country}
        />
        <TouchableOpacity onPress={() => setModalVisible(prev => !prev)}>
          <Text style={styles.countryButton}>
            {country === null ? Resources.Texts.PickCountryText
            : `${Resources.Texts.SelectedCountryText}: ${country}`}
          </Text>
        </TouchableOpacity>
        {validation?.validCountry === false && (
                <Animated.Text
                  style={styles.errors}
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}>
                {Resources.ValidationMessages.CountryInvalid}
                </Animated.Text>
              )}
        <TextInput
          style={styles.textInput}
          placeholder={Resources.Placeholders.City}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setCity}
        />
        {validation?.validCity === false && (
              <Animated.Text
                style={styles.errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.CityInvalid}
              </Animated.Text>
            )}
        <TextInput
          style={styles.textInput}
          placeholder={Resources.Placeholders.StreetAddress}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setAddress}
        />
        {validation?.validAddress === false && (
              <Animated.Text
                style={styles.errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.StreetAddressInvalid}
              </Animated.Text>
            )}
        <TextInput
          style={styles.textInput}
          placeholder={Resources.Placeholders.Email}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setEmail}
          defaultValue={email}
        />
        {validation?.validEmail === false && (
              <Animated.Text
                style={styles.errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.EmailInvalid}
              </Animated.Text>
            )}
        <TextInput
          style={styles.textInput}
          placeholder={Resources.Placeholders.Phone}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
          onChangeText={setPhone}
          defaultValue={phone}
        />
        {validation?.validPhone === false && (
              <Animated.Text
                style={styles.errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.PhoneNumberInvalid}
              </Animated.Text>
            )}
        <CustomButton btnText={Resources.ButtonTexts.SaveBtnText} onPress={async() => await SavePress()} styles={styles}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateFacility;
