import React from 'react';
import Animated, {
  FadeInLeft,
} from 'react-native-reanimated';

import styles from './styles';
import {View} from 'react-native';
import Resources from '../../Resources';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Button, Card, Divider, Icon, Text } from '@rneui/themed';
import MuscleIcon from '../muscleIcon';

const UserTrainingPlanExerciseWithSets = ({data, theme, userData, navigation}) => {
  const sets = JSON.parse(data.sets)
  const muscleGroups = JSON.parse(data.muscleGroups)
  const loggedSets = data.loggedSets ? JSON.parse(data.loggedSets) : null;

  return (
    <Animated.View
      entering={FadeInLeft.delay(200)}>
       <Card containerStyle={styles({theme: theme}).card}>
          <Card.Title h4>{data.exerciseName}</Card.Title>
          <Card.Divider />
          <View style={styles({theme: theme}).infoView}>
            <View
              style={{
                ...styles({theme: theme}).subView,
              }}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
              <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 2,
                }}>
                  {muscleGroups.map((x, i) => {
                    return <MuscleIcon key={i} muscleName={x} size={30} />
                  })}
                </View>
              {data.equipment !== null ?
              <>
                <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
                  <Text style={styles({theme: theme}).text}>
                    {data.equipment === null ? `${Resources.Texts.NoEquipment}`
                    : data?.equipment?.name}
                  </Text> 
              </>: null}
            </View>
            <Divider orientation='vertical' />
            <View
              style={{
                ...styles({theme: theme}).subView,
                alignItems: 'flex-end',
              }}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Sets}</Text>
              {sets?.length > 0 ?
                sets.map((x, i) => {
                  return <Text 
                          key={i}
                          style={styles({theme: theme}).text}>
                            {x.Repetitions} x {Number(x.Weights) === 0 ? 
                            'No weights' 
                            : x.Weights+'kg'}
                          </Text>
                }) : null}
              <Text style={styles({theme: theme}).boldText}>{userData.role === 'User' ? 'Completed sets' : 'Logged sets'}</Text>
              {userData?.role === 'Trainer' ?
               loggedSets?.length > 0 ?
                loggedSets.map((x, i) => {
                  return <Text 
                          key={i}
                          style={styles({theme: theme}).text}>
                            {x.Repetitions} x {Number(x.Weights) === 0 ? 
                            'No weights' 
                            : x.Weights+'kg'}
                          </Text>
                }) : <Text>No sets are logged</Text>
              : null}
              {userData.role === 'User' && <Text>{loggedSets === null ? 0 : loggedSets.length} / {sets.length}</Text>}
            </View>
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
            title='How To Do'
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
                params: {exerciseId: data.exerciseId},
              })
            }
          />}
        </Card>
    </Animated.View>
  )
};

export default UserTrainingPlanExerciseWithSets