import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import styles from './styles'
import Login from '../login'
import Screens from '../Screens'
import Constants from '../../Constants'

const Welcome = ({navigation}) => {

  return (
    <View style={styles.view}>
      <Text style={styles.heading}>{Constants.AppName}</Text>
      <Login />
      <View style={styles.horizontalFlex}>
        <Text style={styles.text}>{Constants.CreateAccountText}</Text>
        <CustomButton 
            btnText={Constants.RegisterBtnText} 
            styles={styles} 
          onPress={() => navigation.navigate(Screens.Register)}/>
      </View>
    </View>
  )
}

export default Welcome