import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Equipment = ({equipment}) => {

  return (
    <View style={styles.card}>
        <View style={styles.cityView}>
            <Text style={styles.cityText}>Test</Text>
        </View>
        <View style={styles.contactsView}>
            <Text style={styles.contactsText}>Address</Text>
        </View>
    </View>
  )
}

export default Equipment