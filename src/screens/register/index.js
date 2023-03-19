import { View, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Resources from '../../Resources'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../../components/CustomButton'
import { Validation } from './validation'
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated'

const Register = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [validation, setValidation] = useState(null);

  return (
    <View style={styles.view}>
      <Text style={styles.heading}>{Resources.Texts.RegisterHeadingText}</Text>
      <TextInput 
        style={styles.textInput} 
        onChangeText={setName} 
        maxLength={15}
        placeholder={Resources.Placeholders.Name}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
       {validation?.validName === false &&
        <Animated.Text style={{color: Resources.Colors.ErrorTextColor}} entering={FadeInLeft} exiting={FadeOutRight}>
          {Resources.ValidationMessages.NameInvalid}
        </Animated.Text>}
      <TextInput 
        style={styles.textInput} 
        onChangeText={setSurname} 
        maxLength={15}
        placeholder={Resources.Placeholders.Surname}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
       {validation?.validSurname === false &&
        <Animated.Text style={{color: Resources.Colors.ErrorTextColor}} entering={FadeInLeft} exiting={FadeOutRight}>
          {Resources.ValidationMessages.SurnameInvalid}
        </Animated.Text>}
      <TextInput 
        style={styles.textInput} 
        onChangeText={setUsername} 
        maxLength={15}
        placeholder={Resources.Placeholders.Username}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
      {validation?.validUsername === false &&
        <Animated.Text style={{color: Resources.Colors.ErrorTextColor}} entering={FadeInLeft} exiting={FadeOutRight}>
          {Resources.ValidationMessages.UsernameInvalid}
        </Animated.Text>}
      <TextInput 
        style={styles.textInput} 
        onChangeText={setEmail} 
        maxLength={50}
        placeholder={Resources.Placeholders.Email}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
      {validation?.validEmail === false &&
        <Animated.Text style={{color: Resources.Colors.ErrorTextColor}} entering={FadeInLeft} exiting={FadeOutRight}>
          {Resources.ValidationMessages.EmailInvalid}
        </Animated.Text>}
      <TextInput 
        style={styles.textInput} 
        onChangeText={setPassword} 
        secureTextEntry={true}
        maxLength={15}
        placeholder={Resources.Placeholders.Password}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
      {validation?.validPassword === false &&
        <Animated.Text style={{color: Resources.Colors.ErrorTextColor}} entering={FadeInLeft} exiting={FadeOutRight}>
          {Resources.ValidationMessages.PasswordInvalid}
        </Animated.Text>}
      <TextInput 
        style={styles.textInput} 
        onChangeText={setRepeatPassword} 
        secureTextEntry={true}
        maxLength={15}
        placeholder={Resources.Placeholders.RepeatPassword}
        placeholderTextColor={Resources.Colors.PlaceholdersColor}
      />
      {validation?.validRepeatPassword === false &&
        <Animated.Text style={{color: Resources.Colors.ErrorTextColor}} entering={FadeInLeft} exiting={FadeOutRight}>
          {Resources.ValidationMessages.RepeatPasswordInvalid}
        </Animated.Text>}
      <CustomButton
        styles={styles}
        btnText={Resources.ButtonTexts.RegisterBtnText}
        onPress={() => {
          setValidation(Validation(name, surname, username, email, password, repeatPassword))
          console.log(Validation(name, surname, username, email, password, repeatPassword))
        }}
      />
    </View>
  )
}

export default Register