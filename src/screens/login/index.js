import {View} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import CustomButton from '../../components/customButton';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import {Validation} from './validation';
import { LoginCall } from '../../api/LoginCall';
import { UserContext } from '../../../App';
import { useTheme } from '@rneui/themed';

const Login = (props) => {
  const {tokenState, userDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(null);
  const [error, setError] = props?.errorState?.state;
  const [loading, setLoading] = props?.loadingState?.state;

  const {theme} = useTheme();

  const LoginPress = async () => {
    setError(null);
    const validationResult = Validation(username, password);
    if (
      validationResult?.usernameMessage === null &&
      validationResult?.passwordMessage === null
    ) {
      setLoading(true);
      const resp = await LoginCall({'username': username, 'password': password})
      setLoading(false);
      if(resp.status === 200) {
        const data = await resp.json();
        setToken(data.token)
        setUserData(data.data)
        console.log(data.data)
      } else if (resp.status === 404) {
        setError(Resources.Errors.wrongCredentialsError)
      }
    } else {
      setError(Resources.Errors.loginFieldsError)
    }
    setValidation(validationResult);
  };
  
  return (
    <View style={styles.view}>
      {error !== null && (
        <Animated.Text
          style={{...styles({theme: theme}).errors, alignSelf: 'center'}}
          entering={FadeInLeft}
          exiting={FadeOutLeft}>
          {error}
        </Animated.Text>
      )}
      <TextInput
        style={styles({theme: theme}).usernameInput}
        onChangeText={setUsername}
        placeholder={Resources.Placeholders.Username}
        placeholderTextColor={theme.colors.grey2}
      />
      {(validation?.usernameMessage ?? null) !== null && (
        <Animated.Text
          style={styles.errors}
          entering={FadeInLeft}
          exiting={FadeOutLeft}>
          {validation?.usernameMessage}
        </Animated.Text>
      )}
      <TextInput
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles({theme: theme}).passwordInput}
        placeholder={Resources.Placeholders.Password}
        placeholderTextColor={theme.colors.grey2}
      />
      {(validation?.passwordMessage ?? null) !== null && (
        <Animated.Text
          style={styles({theme: theme}).errors}
          entering={FadeInLeft}
          exiting={FadeOutLeft}>
          {validation?.passwordMessage}
        </Animated.Text>
      )}
      <CustomButton
        btnText={Resources.ButtonTexts.LoginBtnText}
        styles={styles({theme: theme})}
        onPress={async() => await LoginPress()}
        loading={loading===true}
        disabled={loading === true}
      />
    </View>
  );
};

export default Login;
