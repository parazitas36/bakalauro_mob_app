import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Icon, Text} from '@rneui/themed';
import {verticalScale} from 'react-native-size-matters';

const ClientCard = ({data, navigation, theme}) => {
  console.log(data);

  const ValueIsNotEmpty = val => {
    return val !== undefined && val !== null && val !== '' && val !== 'null';
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({
          name: 'ClientTrainingPlans',
          params: {
            clientId: data?.id
          }
        })
      }>
      <Card containerStyle={styles({theme: theme}).card}>
        <Card.Title h4>{data.username}</Card.Title>
        <Card.Divider />
        <Text style={styles({theme: theme}).usernameText}>{`${data.name} ${data.surname}`}</Text>
        <Card.Divider inset={true} insetType="middle" />
        {ValueIsNotEmpty(data.email) && 
          <View style={styles({theme: theme}).flexBox}>
            <Icon name="mail-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
            <Text style={styles({theme: theme}).text}>{data.email}</Text>
          </View>}
        {ValueIsNotEmpty(data.phoneNumber) && 
          <View style={styles({theme: theme}).flexBox}>
            <Icon name="call-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
            <Text style={styles({theme: theme}).text}>{data.phoneNumber}</Text>
          </View>}
          <View style={styles({theme: theme}).flexBox}>
            <Icon name='clipboard-list' type='font-awesome-5' color={theme.colors.black} />
            <Text style={styles({theme: theme}).text}>{data.trainingPlansAssigned}</Text>
          </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ClientCard;
