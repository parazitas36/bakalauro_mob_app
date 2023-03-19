import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import styles from './styles'
import Login from '../login'
import Resources from '../../Resources'

const Welcome = ({navigation}) => {

  return (
    <View style={styles.view}>
      <Text style={styles.heading}>{Resources.AppName}</Text>
      <Login />
      <View style={styles.horizontalFlex}>
        <Text style={styles.text}>{Resources.Texts.CreateAccountText}</Text>
        <CustomButton 
            btnText={Resources.ButtonTexts.RegisterBtnText} 
            styles={styles} 
          onPress={() => navigation.navigate(Resources.Screens.Register)}/>
      </View>
    </View>
  )
}

export default Welcome