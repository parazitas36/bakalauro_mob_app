import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApiConstants} from '../../api/ApiConstants';
import { Image } from 'react-native';

const Equipment = ({equipment, token}) => {
  console.log(equipment);

  const ReturnAmount = (val) => {
    if (val === null || val === undefined || val === 0) {
      return ''
    }
    return `(${val})`
  }

  return (
    <View style={styles.card}>
      <View style={styles.equipmentView}>
        <Image
          source={{
            uri: `${ApiConstants().Exercise_Endpoint}file/${String(
              equipment?.imageURI,
            )}`,
            headers: {Authorization: `Bearer ${token}`},
          }}
          style={styles.image}
        />
        <Text style={styles.heading}>{equipment?.amount === 0 ? equipment?.name : `${equipment?.name} ${ReturnAmount(equipment?.amount)}`}</Text>
      </View>
      <View style={styles.descriptionView}>
        <Text style={styles.descriptionText}>{equipment?.description}</Text>
      </View>
    </View>
  );
};

export default Equipment;
