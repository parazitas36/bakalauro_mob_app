import React, {Suspense, useContext, useEffect, useMemo, useState} from 'react';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  FadeOutLeft,
} from 'react-native-reanimated';
import styles from './styles';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import Loading from '../loading';
import Resources from '../../Resources';
import {GetCall} from '../../api/GetCall';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../../components/customButton';
import {Validation} from './validation';
import { PostCall } from '../../api/PostCall';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image, ToastAndroid } from 'react-native';
import { PostSportsClub } from '../../api/PostSportsClub';

const SportsClubCreation = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState(null);
  const [sportsClubName, setSportsClubName] = useState(null);
  const [description, setDescription] = useState(null);
  const [email, setEmail] = useState(userData?.contactInfo?.email);
  const [phone, setPhone] = useState(userData?.contactInfo?.phoneNumber);
  const [image, setImage] = useState(null)

  const validationMemo = useMemo(() => {
    return Validation(sportsClubName, description, email);
  }, [sportsClubName, description, email]);

  const isFormValid =
    validationMemo !== null &&
    validationMemo.validSportsClubName === true &&
    validationMemo.validDescription === true &&
    validationMemo.validEmail === true;

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
          setImage(image)
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const savePress = async() => {
    setError(null)
    if (isFormValid === false) {
      setValidation(validationMemo);
      return;
    }

    if (image === null) {
      ToastAndroid.show(
        'You must select the logo!',
        ToastAndroid.SHORT
      );

      return;
    }

    const body = {
      "name": sportsClubName,
      "description": description,
      "phoneNumber": phone,
      "email": email,
      "image": image
    };

    setLoading(true)
    const resp = await PostSportsClub({token, body})
    setLoading(false)

    if(resp.status === 201) {
      const data = await resp.json();
      setRoleSpecificData(data)
    }else {
      setError(Resources.Errors.existingSportsClub)
    }
  };

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants().AdminClub,
        token: token,
      });
      if (resp.status === 200) {
        const result = await resp.json();
        setTimeout(() => {
          setRoleSpecificData(result)
        }, 500);
      } else {
        setTimeout(() => setRoleSpecificData(''), 500);
      }
    })();
  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        style={styles.view}
        contentContainerStyle={styles.container}
        entering={FadeInLeft}
        exiting={FadeOutRight}>
        {roleSpecificData === null ? (
          <Loading
            text={Resources.ActivityIndicatorLoadingScreen.Texts.Loading}
          />
        ) : (
          <>
            <Animated.Text
              style={styles.heading}
              entering={FadeInLeft.delay(300)}
              exiting={FadeOutRight}>
              {Resources.Texts.SportsClubCreationHeading}
            </Animated.Text>
            {error !== null && (
                <Animated.Text
                  style={styles.errors}
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}>
                  {error}
                </Animated.Text>
              )}
            <Animated.View
              entering={FadeInLeft.delay(300)}
              exiting={FadeOutRight}
              style={styles.animatedView}>
              <TextInput
                style={styles.textInput}
                onChangeText={setSportsClubName}
                placeholder={Resources.Placeholders.SportsClubName}
                placeholderTextColor={Resources.Colors.PlaceholdersColor}
              />
              {validation?.validSportsClubName === false && (
                <Animated.Text
                  style={styles.errors}
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}>
                  {Resources.ValidationMessages.SportsClubName}
                </Animated.Text>
              )}
              <TextInput
                style={{...styles.description, verticalAlign: 'bottom'}}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={3}
                placeholder={Resources.Placeholders.Description}
                placeholderTextColor={Resources.Colors.PlaceholdersColor}
              />
              {validation?.validDescription === false && (
                <Animated.Text
                  style={styles.errors}
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}>
                  {Resources.ValidationMessages.Description}
                </Animated.Text>
              )}
              <TextInput
                style={styles.textInput}
                onChangeText={setEmail}
                defaultValue={userData?.contactInfo?.email}
                placeholder={Resources.Placeholders.Email}
                placeholderTextColor={Resources.Colors.PlaceholdersColor}
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
                onChangeText={setPhone}
                defaultValue={userData?.contactInfo?.phoneNumber}
                placeholder={Resources.Placeholders.Phone}
                placeholderTextColor={Resources.Colors.PlaceholdersColor}
              />
              {image !== null ? 
              <Image
                source={{uri: image?.uri}}
                style={{height: 100, width: 100}}
              /> : null}
              <CustomButton
                styles={styles}
                btnText={image === null ? 'Select logo' : 'Change logo'}
                onPress={async() => await addImage()}
                disabled={loading === true}
              />
              <CustomButton
                styles={styles}
                btnText={Resources.ButtonTexts.SaveBtnText}
                onPress={async() => await savePress()}
                disabled={loading === true}
                loading={loading === true}
              />
            </Animated.View>
          </>
        )}
      </Animated.ScrollView>
    </Suspense>
  );
};

export default SportsClubCreation;
