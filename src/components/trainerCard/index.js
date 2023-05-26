import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Icon, Text} from '@rneui/themed';
import {verticalScale} from 'react-native-size-matters';

const TrainerCard = ({data, navigation, theme, isClubTrainer}) => {

  const ValueIsNotEmpty = val => {
    return val !== undefined && val !== null && val !== '' && val !== 'null';
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({name: 'Trainer', params: {trainerId: data.id, isClubTrainer: isClubTrainer}})
      }>
      <Card containerStyle={styles({theme: theme}).card}>
        <Card.Title h4>{data.username}</Card.Title>
        <Card.Divider />
        <Text style={styles({theme: theme}).usernameText}>{`${data.name} ${data.lastName}`}</Text>
        <Card.Divider inset={true} insetType="middle" />
        {ValueIsNotEmpty(data.email) && 
          <View style={styles({theme: theme}).flexBox}>
            <Icon name="mail-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
            <Text style={styles({theme: theme}).text}>{data.email}</Text>
          </View>}
        {ValueIsNotEmpty(data.phone) && 
          <View style={styles({theme: theme}).flexBox}>
            <Icon name="call-outline" type="ionicon" color={theme.colors.black} size={verticalScale(20)} />
            <Text style={styles({theme: theme}).text}>{data.phone}</Text>
          </View>}
          <View style={styles({theme: theme}).flexBox}>
            <Icon name="star-sharp" type="ionicon" color={theme.colors.warning} size={verticalScale(20)} />
            <Text style={styles({theme: theme}).text}>{data.averageRating ? `${data.averageRating} (${data.reviewsCount})` : 'Not rated'}</Text>
          </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TrainerCard;
