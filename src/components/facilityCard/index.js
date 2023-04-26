import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FacilityCard = ({navigation, facility, sportsClubName}) => {
  const navigateToFacilityComponent = () => {
    navigation.navigate({
      name: 'Facility',
      params: {facility: facility, sportsClubName: sportsClubName},
    })
  }

  return (
    <TouchableOpacity onPress={() => navigateToFacilityComponent()}>
      <View style={styles.card}>
          <View style={styles.cityView}>
              <Text style={styles.cityText}>{facility.country}, {facility.city}</Text>
          </View>
          <View style={styles.contactsView}>
              <Text style={styles.contactsText}>Address: {facility.coordinates}</Text>
              <Text style={styles.contactsText}>Email: {facility.contactInfo?.email}</Text>
              <Text style={styles.contactsText}>Phone: {facility.contactInfo?.phoneNumber}</Text>
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default FacilityCard