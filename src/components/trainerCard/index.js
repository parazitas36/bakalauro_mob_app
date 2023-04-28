import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomButton from '../customButton'
import Resources from '../../Resources'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TrainerCard = ({data, navigation}) => {
console.log(data)

const ValueIsNotEmpty = (val) => {
  return val !== undefined && val !== null && val !== '' && val !== 'null'
}

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate({name: 'Trainer', params: {trainerId: data.id}})}
     style={styles.card}>
        <View style={styles.titleView}>
            <Text style={styles.titleText}>{`${data.name} ${data.lastName} (${data.username})`}</Text>
        </View>
        <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsView}>
            {ValueIsNotEmpty(data.email) && <Text style={styles.detailsText}>Email: {data.email}</Text>}
            {ValueIsNotEmpty(data.phone) && <Text style={styles.detailsText}>Phone: {data.phone}</Text>}
            <Text style={styles.detailsText}>Rating: {data.averageRating ?? 'Not rated'}</Text>
            <Text style={styles.detailsText}>Reviews: {data.reviewsCount === 0 ? 'No reviews' : data.reviewsCount}</Text>
        </ScrollView>
    </TouchableOpacity>
  )
}

export default TrainerCard