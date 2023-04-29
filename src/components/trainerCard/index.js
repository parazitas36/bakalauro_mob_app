import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import Resources from '../../Resources'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TrainerCard = ({data, navigation, theme}) => {
console.log(data)

const ValueIsNotEmpty = (val) => {
  return val !== undefined && val !== null && val !== '' && val !== 'null'
}

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate({name: 'Trainer', params: {trainerId: data.id}})}
     style={styles({theme: theme}).card}>
        <View style={styles({theme: theme}).titleView}>
            <Text style={styles({theme: theme}).titleText}>{`${data.name} ${data.lastName} (${data.username})`}</Text>
        </View>
        <View style={styles({theme: theme}).detailsView}>
            {ValueIsNotEmpty(data.email) && <Text style={styles({theme: theme}).detailsText}>Email: {data.email}</Text>}
            {ValueIsNotEmpty(data.phone) && <Text style={styles({theme: theme}).detailsText}>Phone: {data.phone}</Text>}
            <Text style={styles({theme: theme}).detailsText}>Rating: {data.averageRating ?? 'Not rated'}</Text>
            <Text style={styles({theme: theme}).detailsText}>Reviews: {data.reviewsCount === 0 ? 'No reviews' : data.reviewsCount}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default TrainerCard