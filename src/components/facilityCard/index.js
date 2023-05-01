import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Icon, Text} from '@rneui/themed';
import {verticalScale} from 'react-native-size-matters';

const FacilityCard = ({navigation, facility, sportsClubName, theme}) => {
  const navigateToFacilityComponent = () => {
    navigation.navigate({
      name: 'Facility',
      params: {facility: facility, sportsClubName: sportsClubName},
    });
  };

  return (
    <TouchableOpacity onPress={() => navigateToFacilityComponent()}>
      <Card containerStyle={styles({theme: theme}).card}>
        <Card.Title>
          {facility.country}, {facility.city}
        </Card.Title>
        <Card.Divider />
        <View style={styles({theme: theme}).flexBox}>
          <Icon name="location-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
          <Text style={styles({theme: theme}).text}>{facility.address}</Text>
        </View>
        <View style={styles({theme: theme}).flexBox}>
          <Icon name="mail-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
          <Text style={styles({theme: theme}).text}>{facility.contactInfo?.email}</Text>
        </View>
        <View style={styles({theme: theme}).flexBox}>
          <Icon name="call-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
          <Text style={styles({theme: theme}).text}>{facility.contactInfo?.phoneNumber}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default FacilityCard;
