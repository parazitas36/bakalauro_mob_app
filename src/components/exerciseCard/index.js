import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomButton from '../customButton'
import Resources from '../../Resources'

const ExerciseCard = ({data, navigation}) => {
console.log(data)
  return (
    <View style={styles.card}>
        <View style={styles.titleView}>
            <Text style={styles.titleText}>{data.name}</Text>
        </View>
        <View style={styles.detailsView}>
            <Text style={styles.detailsText}>Details</Text>
        </View>
        {data.hasGuide ? <CustomButton 
          styles={styles}
          btnText='Show guide'
          onPress={() => navigation.navigate({name: 'Exercise', params: {exerciseId: data.id}})}/> : null}
    </View>
  )
}

export default ExerciseCard