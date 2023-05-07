import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { Button, Card, Icon, Text } from '@rneui/themed';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MuscleIcon from '../muscleIcon';
import { View } from 'react-native';

const ExerciseCard = ({data, navigation, theme}) => {
  console.log(data);

  const muscleGroups = JSON.parse(data?.muscleGroups)

  console.log(muscleGroups)

  return (
    <Card containerStyle={styles({theme: theme}).card}>
      <Card.Title h4>{data.name}</Card.Title>
      <Card.Divider subHeader='Targets muscle groups' subHeaderStyle={{color: theme.colors.grey0, marginBottom: 5}}/>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 2}}>
        {muscleGroups && muscleGroups.map((x, i) => {
          return <MuscleIcon key={i} muscleName={x} size={35}/>
        })}
      </View>
      {data.hasGuide && 
      <Button
        icon={
          <Icon 
          name='info' 
          color={theme.colors.black} 
          size={verticalScale(20)}
          iconStyle={{marginRight: scale(5)}} />
        }
        title='Show guide'
        buttonStyle={{
          borderRadius: moderateScale(3),
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.black,
          borderWidth: moderateScale(1.25),
          marginTop: verticalScale(5),
        }}
        titleStyle={{
          color: theme.colors.black,
        }}
        onPress={() =>
          navigation.navigate({
            name: 'Exercise',
            params: {exerciseId: data.id},
          })
        }
      />}
    </Card>
  )
};

export default React.memo(ExerciseCard);
