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
        <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsView}>
            <Text style={styles.detailsText}>Details</Text>
        </ScrollView>
        {data.hasGuide ? <CustomButton 
          styles={styles}
          btnText='Show'
          onPress={() => navigation.navigate({name: 'Exercise', params: {exerciseId: data.id}})}/> : null}
    </View>
  )
}

export default ExerciseCard