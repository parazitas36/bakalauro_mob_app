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

  const validationMemo = useMemo(() => {
    return Validation(sportsClubName, description, email);
  }, [sportsClubName, description, email]);

  const isFormValid =
    validationMemo !== null &&
    validationMemo.validSportsClubName === true &&
    validationMemo.validDescription === true &&
    validationMemo.validEmail === true;

  const savePress = async() => {
    setError(null)
    if (isFormValid === false) {
      setValidation(validationMemo);
      return;
    }

    const body = {
      "name": sportsClubName,
      "description": description,
      "contactInfo": {
        "phoneNumber": phone,
        "email": email
      }
    };

    setLoading(true)
    const resp = await PostCall({endpoint: ApiConstants().SportsClub_Endpoint, body: body, token: token})
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
      <Animated.View
        style={styles.view}
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
      </Animated.View>
    </Suspense>
  );
};

export default SportsClubCreation;
