import {View, Text} from 'react-native';
import React from 'react';
import Resources from '../../Resources';
import { Card, useTheme } from '@rneui/themed';
import MuscleIcon from '../muscleIcon';
import { moderateScale, scale } from 'react-native-size-matters';

const TrainingPlanExercisesInfo = ({muscleGroups}) => {

  const {theme} = useTheme();

  return (
    <Card containerStyle={{width: scale(280), borderRadius: moderateScale(5)}}>
      <Card.Title>{Resources.Texts.TargetMuscleGroupsLabel}</Card.Title>
      <Card.Divider />
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            {muscleGroups?.length > 0 ? muscleGroups.map((x, i) => {
              return (
                <MuscleIcon muscleName={x} key={i} size={40} />
              );
            })
            : null}
          </View>
    </Card>
  )
};

export default TrainingPlanExercisesInfo;
