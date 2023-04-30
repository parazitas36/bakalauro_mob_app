import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApiConstants} from '../../api/ApiConstants';
import { Image } from 'react-native';

const Equipment = ({equipment, token, theme}) => {
  console.log(equipment);

  const ReturnAmount = (val) => {
    if (val === null || val === undefined || val === 0) {
      return ''
    }
    return `(${val})`
  }

  return (
    <View style={styles({theme: theme}).card}>
      <View style={styles({theme: theme}).equipmentView}>
        <Image
          source={{
            uri: `${ApiConstants().Exercise_Endpoint}file/${String(
              equipment?.imageURI,
            )}`,
            headers: {Authorization: `Bearer ${token}`},
          }}
          style={styles({theme: theme}).image}
        />
        <Text style={styles({theme: theme}).heading}>{equipment?.amount === 0 ? equipment?.name : `${equipment?.name} ${ReturnAmount(equipment?.amount)}`}</Text>
      </View>
      <View style={styles({theme: theme}).descriptionView}>
        <Text style={styles({theme: theme}).descriptionText}>{equipment?.description}</Text>
      </View>
    </View>
  );
};

export default Equipment;
