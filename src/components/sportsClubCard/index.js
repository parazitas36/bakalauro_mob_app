import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButton from '../customButton';
import Resources from '../../Resources';
import { ApiConstants } from '../../api/ApiConstants';
import { TouchableOpacity } from 'react-native';

const SportsClubCard = ({data, navigation, token}) => {
  console.log(data);

  const ValueIsNotEmpty = value => {
    return value !== undefined && value !== null && value !== '' && value !== 'null'
  };

  return (
    <TouchableOpacity style={styles.sportsClubView}>
      <Text style={styles.heading}>{data.name}</Text>
      <View style={styles.flexRow}>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: `${ApiConstants().Exercise_Endpoint}file/${String(
                data.logoUri,
              )}`,
              headers: {Authorization: `Bearer ${token}`},
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.btnText}>Facilities: {data.facilitiesCount}</Text>
          <Text style={styles.btnText}>Trainers: {data.trainersCount}</Text>
          {ValueIsNotEmpty(data.email) ? (
            <Text style={styles.btnText}>Email: {data.email}</Text>
          ) : null}
          {ValueIsNotEmpty(data.phoneNumber) ? (
            <Text style={styles.btnText}>Phone: {data.phoneNumber}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SportsClubCard;
