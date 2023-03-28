import {View, Text, Switch} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './styles';
import Resources from '../../Resources';
import {TextInput} from 'react-native-gesture-handler';
import {Validation} from './validation';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import CustomButton from '../../components/customButton';
import {ScrollView} from 'react-native';
import {RegisterCall} from '../../api/RegisterCall';
import {ToastAndroid} from 'react-native';
import {LogBox} from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';

const Register = ({navigation}) => {
  LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  ]);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null)
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '0',
      label: 'Sports Club Admin',
      value: 0,
      labelStyle: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText *.8,
      }
    },
    {
      id: '1',
      label: 'Trainer',
      value: 1,
      labelStyle: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText *.8,
      }
    },
    {
      id: '2',
      label: 'User',
      value: 2,
      labelStyle: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText *.8,
      }
    }
  ]);
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [imperialSystem, setImperialSystem] = useState(false);

  const validationMemo = useMemo(() => {
    return Validation(
      name,
      surname,
      username,
      email,
      password,
      repeatPassword,
      role,
    );
  }, [name, surname, username, email, password, repeatPassword, role]);

  const formIsValid =
    validationMemo !== null &&
    validationMemo?.validName === true &&
    validationMemo?.validSurname &&
    validationMemo?.validEmail &&
    validationMemo?.validPassword &&
    validationMemo?.validRepeatPassword &&
    validationMemo?.validUsername &&
    validationMemo?.validRole;

  const onPressRadioButton = (radioButtonsArray) => {
    setRole(radioButtons?.find(x => x.selected === true)?.value)
    setRadioButtons(radioButtonsArray)
  }

  const RegisterPress = async () => {
    setRegisterError(false);

    if (formIsValid) {
      const body = {
        "username": username,
        "email": email,
        "password": password,
        "repeatPassword": repeatPassword,
        "role": Number(role),
        "contactInfo": {
          "email": email,
        },
        "usesImperialSystem": imperialSystem,
        "name": name,
        "surname": surname,
        "isPublicName": true,
      };

      setLoading(true);
      const resp = await RegisterCall(body);
      setLoading(false);

      if (resp?.status === 200) {
        ToastAndroid.show(
          Resources.Texts.RegistrationSuccessful,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        navigation.navigate(Resources.Screens.Welcome);
      } else {
        setRegisterError(Resources.Errors.registerError);
      }
    }
    setValidation(validationMemo);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        style={styles.view}>
        <Text style={styles.heading}>
          {Resources.Texts.RegisterHeadingText}
        </Text>
        {registerError !== null && (
          <Animated.Text
            style={styles.errors}
            entering={FadeInRight}
            exiting={FadeOutRight}>
            {registerError}
          </Animated.Text>
        )}
        <View style={styles.dividedView}>
          <View style={styles.partOfDividedView}>
            <TextInput
              style={styles.dividedTextInput}
              onChangeText={setName}
              maxLength={15}
              placeholder={Resources.Placeholders.Name}
              placeholderTextColor={Resources.Colors.PlaceholdersColor}
            />
            {validation?.validName === false && (
              <Animated.Text
                style={styles.errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.NameInvalid}
              </Animated.Text>
            )}
          </View>
          <View style={styles.partOfDividedView}>
            <TextInput
              style={styles.dividedTextInput}
              onChangeText={setSurname}
              maxLength={15}
              placeholder={Resources.Placeholders.Surname}
              placeholderTextColor={Resources.Colors.PlaceholdersColor}
            />
            {validation?.validSurname === false && (
              <Animated.Text
                style={styles.errors}
                entering={FadeInRight}
                exiting={FadeOutRight}>
                {Resources.ValidationMessages.SurnameInvalid}
              </Animated.Text>
            )}
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={setUsername}
          maxLength={15}
          placeholder={Resources.Placeholders.Username}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        {validation?.validUsername === false && (
          <Animated.Text
            style={styles.errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.UsernameInvalid}
          </Animated.Text>
        )}
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          maxLength={50}
          placeholder={Resources.Placeholders.Email}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        {validation?.validEmail === false && (
          <Animated.Text
            style={styles.errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.EmailInvalid}
          </Animated.Text>
        )}
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          secureTextEntry={true}
          maxLength={15}
          placeholder={Resources.Placeholders.Password}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        {validation?.validPassword === false && (
          <Animated.Text
            style={styles.errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.PasswordInvalid}
          </Animated.Text>
        )}
        <TextInput
          style={styles.textInput}
          onChangeText={setRepeatPassword}
          secureTextEntry={true}
          maxLength={15}
          placeholder={Resources.Placeholders.RepeatPassword}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        {validation?.validRepeatPassword === false && (
          <Animated.Text
            style={styles.errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.RepeatPasswordInvalid}
          </Animated.Text>
        )}
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} layout="row" />
        {validation?.validRole === false && (
          <Animated.Text
            style={styles.errors}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.RoleInvalid}
          </Animated.Text>
        )}
        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              ...styles.btnText,
              color:
                imperialSystem === false
                  ? Resources.Colors.TextColorWhite
                  : Resources.Colors.PlaceholdersColor,
            }}>
            {Resources.Texts.MetricSystem}
          </Text>
          <Switch
            trackColor={{false: 'rgba(255, 255, 255, 0.2)', true: 'rgba(255, 255, 255, 0.75)'}}
            thumbColor={imperialSystem ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={value => {
              setImperialSystem(value);
            }}
            value={imperialSystem}
          />
          <Text
            style={{
              ...styles.btnText,
              color:
                imperialSystem === true
                  ? Resources.Colors.TextColorWhite
                  : Resources.Colors.PlaceholdersColor,
            }}>
            {Resources.Texts.ImperialSystem}
          </Text>
        </View>
        <CustomButton
          styles={styles}
          btnText={Resources.ButtonTexts.RegisterBtnText}
          onPress={async () => await RegisterPress()}
          loading={loading === true}
          disabled={loading === true}
        />
      </Animated.View>
    </ScrollView>
  );
};

export default Register;
