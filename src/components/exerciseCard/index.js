import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'

const ExerciseCard = () => {
  return (
    <View style={styles.card}>
        <View style={styles.titleView}>
            <Text style={styles.titleText}>Name</Text>
        </View>
        <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsView}>
            <Text style={styles.detailsText}>Details</Text>
        </ScrollView>
    </View>
  )
}

export default ExerciseCard