import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomButton from '../customButton'
import Resources from '../../Resources'

const ExerciseCard = ({data, navigation, theme}) => {
console.log(data)
  return (
    <View style={styles({theme: theme}).card}>
        <View style={styles({theme: theme}).titleView}>
            <Text style={styles({theme: theme}).titleText}>{data.name}</Text>
        </View>
        {data.hasGuide ? <CustomButton 
          styles={styles({theme: theme})}
          btnText='Show guide'
          onPress={() => navigation.navigate({name: 'Exercise', params: {exerciseId: data.id}})}/> : null}
    </View>
  )
}

export default ExerciseCard