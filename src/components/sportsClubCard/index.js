import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { ApiConstants } from '../../api/ApiConstants';
import { TouchableOpacity } from 'react-native';

const SportsClubCard = ({data, navigation, token, theme}) => {
  console.log(data);

  const ValueIsNotEmpty = value => {
    return value !== undefined && value !== null && value !== '' && value !== 'null'
  };

  return (
    <TouchableOpacity style={styles({theme: theme}).sportsClubView}>
      <Text style={styles({theme: theme}).heading}>{data.name}</Text>
      <View style={styles({theme: theme}).flexRow}>
        <View style={styles({theme: theme}).imageView}>
          <Image
            source={{
              uri: `${ApiConstants().Exercise_Endpoint}file/${String(
                data.logoUri,
              )}`,
              headers: {Authorization: `Bearer ${token}`},
            }}
            style={styles({theme: theme}).image}
          />
        </View>
        <View style={styles({theme: theme}).infoView}>
          <Text style={styles({theme: theme}).text}>Facilities: {data.facilitiesCount}</Text>
          <Text style={styles({theme: theme}).text}>Trainers: {data.trainersCount}</Text>
          {ValueIsNotEmpty(data.email) ? (
            <Text style={styles({theme: theme}).text}>Email: {data.email}</Text>
          ) : null}
          {ValueIsNotEmpty(data.phoneNumber) ? (
            <Text style={styles({theme: theme}).text}>Phone: {data.phoneNumber}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SportsClubCard;
