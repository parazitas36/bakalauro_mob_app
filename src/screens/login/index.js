import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomButton from '../../components/CustomButton'
import { TextInput } from 'react-native-gesture-handler'

const Login = () => {
  return (
    <View style={styles.view}>
      <TextInput style={styles.usernameInput} placeholder="Username" placeholderTextColor='grey'/>
      <TextInput secureTextEntry={true} style={styles.passwordInput} placeholder="Password" placeholderTextColor='grey' />
      <CustomButton btnText='Sign In' styles={styles}/>
    </View>
  )
}

export default Login