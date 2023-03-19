import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButton from '../../components/CustomButton';
import {TextInput} from 'react-native-gesture-handler';
import Resources from '../../Resources';

const Login = () => {
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.usernameInput}
        placeholder={Resources.Placeholders.Username}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.passwordInput}
        placeholder={Resources.Placeholders.Password}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
      <CustomButton 
        btnText={Resources.ButtonTexts.LoginBtnText}
        styles={styles} 
      />
    </View>
  );
};

export default Login;
