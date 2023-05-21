import {View, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { ApiConstants } from '../../api/ApiConstants';
import { TouchableOpacity } from 'react-native';
import { Card, Icon, Text } from '@rneui/themed';
import { verticalScale } from 'react-native-size-matters';

const SportsClubCard = ({data, navigation, token, theme, disabled=false}) => {
  console.log(data);

  const ValueIsNotEmpty = value => {
    return value !== undefined && value !== null && value !== '' && value !== 'null'
  };

  const ClubCard = () => {
    return (
      <Card containerStyle={styles({theme: theme}).sportsClubView}>
        <Card.Title>{data.name}</Card.Title>
        <Card.Divider/>
          <View style={{flexDirection: 'row'}}>
              <View style={styles({theme: theme}).imageView}>
                <Image
                  source={{
                    uri: `${ApiConstants().GetFile}${String(
                      data.logoUri,
                    )}`,
                    headers: {Authorization: `Bearer ${token}`},
                  }}
                  style={styles({theme: theme}).image}
                />
              </View>
              <View style={styles({theme: theme}).infoView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles({theme: theme}).text}>Facilities: {data.facilitiesCount}</Text>
                  <Icon name="city" type="font-awesome-5" color={theme.colors.black} size={verticalScale(16)} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles({theme: theme}).text}>Trainers: {data.trainersCount}</Text>
                  <Icon name="people-circle-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {ValueIsNotEmpty(data.email) ? 
                  <>
                    <Text style={styles({theme: theme}).text}>{data.email}</Text>
                    <Icon name="mail-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
                  </> : null}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {ValueIsNotEmpty(data.phoneNumber)  ? 
                  <>
                    <Text style={styles({theme: theme}).text}>{data.phoneNumber}</Text> 
                    <Icon name="call-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
                  </> : null}
                </View>
              </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Icon name="star-sharp" type="ionicon" color={theme.colors.warning} size={verticalScale(20)} />
            <Text style={styles({theme: theme}).text}>{data.averageRating ? `${data.averageRating} (${data.reviewsCount})` : 'Not rated'}</Text>
          </View>
      </Card>
    )
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={() => {navigation.navigate({name: 'SportsClub', params: {id: data.id}})}}>
      <ClubCard />
    </TouchableOpacity>
  )
};

export default SportsClubCard;
