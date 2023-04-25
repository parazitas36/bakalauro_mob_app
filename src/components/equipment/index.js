import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Equipment = ({equipment}) => {
  console.log(equipment)
  return (
    <View style={styles.card}>
        <View style={styles.equipmentView}>
            <Text style={styles.heading}>{equipment?.name}</Text>
        </View>
        <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>{equipment?.description}</Text>
        </View>
    </View>
  )
}

export default Equipment