import React from 'react';
import styles from './styles';
import {ApiConstants} from '../../api/ApiConstants';
import { Card, Text } from '@rneui/themed';

const Equipment = ({equipment, token, theme}) => {
  console.log(equipment);

  const ReturnAmount = (val) => {
    if (val === null || val === undefined || val === 0) {
      return ''
    }
    return `(${val})`
  }

  return (
    <Card containerStyle={styles({theme: theme}).card}>
      <Card.Title h4>{equipment?.amount === 0 ? equipment?.name : `${equipment?.name} ${ReturnAmount(equipment?.amount)}`}</Card.Title>
      <Card.Divider/>
      <Card.Image 
        source={{
          uri: `${ApiConstants().Exercise_Endpoint}file/${String(
            equipment?.imageURI,
          )}`,
          headers: {Authorization: `Bearer ${token}`},
        }}
        style={{resizeMode: 'cover', padding: 0}}
      />
      <Text style={styles({theme: theme}).descriptionText}>{equipment?.description}</Text>
    </Card>
  )
};

export default Equipment;
