import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FacilityCard = ({navigation, facility, sportsClubName, theme}) => {
  const navigateToFacilityComponent = () => {
    navigation.navigate({
      name: 'Facility',
      params: {facility: facility, sportsClubName: sportsClubName},
    })
  }

  return (
    <TouchableOpacity onPress={() => navigateToFacilityComponent()}>
      <View style={styles({theme: theme}).card}>
          <View style={styles({theme: theme}).cityView}>
              <Text style={styles({theme: theme}).cityText}>{facility.country}, {facility.city}</Text>
          </View>
          <View style={styles({theme: theme}).contactsView}>
              <Text style={styles({theme: theme}).contactsText}>Address: {facility.coordinates}</Text>
              <Text style={styles({theme: theme}).contactsText}>Email: {facility.contactInfo?.email}</Text>
              <Text style={styles({theme: theme}).contactsText}>Phone: {facility.contactInfo?.phoneNumber}</Text>
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default FacilityCard