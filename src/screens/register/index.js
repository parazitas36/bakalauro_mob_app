import {View, Text, Switch} from 'react-native';
import React, {useMemo, useState} from 'react';
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
import styles from './styles';
import { ButtonGroup, useTheme } from '@rneui/themed';

const Register = ({navigation}) => {
  LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  ]);

  const {theme} = useTheme();

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(0)
  const [repeatPassword, setRepeatPassword] = useState(null);

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
    <ScrollView
      style={styles({theme: theme}).scrollViewBackground}
      contentContainerStyle={styles({theme: theme}).scrollView}>
      <Animated.View
        entering={FadeInDown.delay(100)}
        exiting={FadeOutDown}
        style={styles.view}>
        <Text style={styles({theme: theme}).heading}>
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
        <View style={styles({theme: theme}).dividedView}>
          <View style={styles({theme: theme}).partOfDividedView}>
            <TextInput
              style={styles({theme: theme}).dividedTextInput}
              onChangeText={setName}
              maxLength={15}
              placeholder={Resources.Placeholders.Name}
              placeholderTextColor={theme.colors.grey2}
            />
            {validation?.validName === false && (
              <Animated.Text
                style={styles({theme: theme}).errors}
                entering={FadeInLeft}
                exiting={FadeOutLeft}>
                {Resources.ValidationMessages.NameInvalid}
              </Animated.Text>
            )}
          </View>
          <View style={styles({theme: theme}).partOfDividedView}>
            <TextInput
              style={styles({theme: theme}).dividedTextInput}
              onChangeText={setSurname}
              maxLength={15}
              placeholder={Resources.Placeholders.Surname}
              placeholderTextColor={theme.colors.grey2}
            />
            {validation?.validSurname === false && (
              <Animated.Text
                style={styles({theme: theme}).errors}
                entering={FadeInRight}
                exiting={FadeOutRight}>
                {Resources.ValidationMessages.SurnameInvalid}
              </Animated.Text>
            )}
          </View>
        </View>
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setUsername}
          maxLength={15}
          placeholder={Resources.Placeholders.Username}
          placeholderTextColor={theme.colors.grey2}
        />
        {validation?.validUsername === false && (
          <Animated.Text
            style={styles({theme: theme}).errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.UsernameInvalid}
          </Animated.Text>
        )}
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setEmail}
          maxLength={50}
          placeholder={Resources.Placeholders.Email}
          placeholderTextColor={theme.colors.grey2}
        />
        {validation?.validEmail === false && (
          <Animated.Text
            style={styles({theme: theme}).errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.EmailInvalid}
          </Animated.Text>
        )}
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setPassword}
          secureTextEntry={true}
          maxLength={15}
          placeholder={Resources.Placeholders.Password}
          placeholderTextColor={theme.colors.grey2}
        />
        {validation?.validPassword === false && (
          <Animated.Text
            style={styles({theme: theme}).errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.PasswordInvalid}
          </Animated.Text>
        )}
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setRepeatPassword}
          secureTextEntry={true}
          maxLength={15}
          placeholder={Resources.Placeholders.RepeatPassword}
          placeholderTextColor={theme.colors.grey2}
        />
        {validation?.validRepeatPassword === false && (
          <Animated.Text
            style={styles({theme: theme}).errorsFlexStart}
            entering={FadeInLeft}
            exiting={FadeOutRight}>
            {Resources.ValidationMessages.RepeatPasswordInvalid}
          </Animated.Text>
        )}
        <ButtonGroup
          buttons={[Resources.Roles.SportsClubAdmin, Resources.Roles.Trainer, Resources.Roles.User]}
          selectedIndex={role}
          onPress={(value) => setRole(value)}
          selectedTextStyle={{color: theme.colors.white, fontWeight: '700'}}
          selectedButtonStyle={{backgroundColor: theme.colors.black}}
          disabledSelectedStyle={{backgroundColor: theme.colors.grey5}}
          buttonStyle={{backgroundColor: theme.colors.grey4}}
          textStyle={{color: theme.colors.black, textAlign: 'center'}}
        />
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
              ...styles({theme: theme}).btnText,
              color:
                imperialSystem === false
                  ? theme.colors.black
                  : theme.colors.grey3,
            }}>
            {Resources.Texts.MetricSystem}
          </Text>
          <Switch
            trackColor={{false: theme.colors.grey2, true: theme.colors.grey3}}
            thumbColor={theme.colors.black}
            onValueChange={value => {
              setImperialSystem(value);
            }}
            value={imperialSystem}
          />
          <Text
            style={{
              ...styles({theme: theme}).btnText,
              color:
                imperialSystem === true
                  ? theme.colors.black
                  : theme.colors.grey3,
            }}>
            {Resources.Texts.ImperialSystem}
          </Text>
        </View>
        <CustomButton
          styles={styles({theme: theme})}
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
