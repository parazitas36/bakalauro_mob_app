import React from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import {scale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TrainingPlan = ({navigation, trainingPlan, theme}) => {
  return (
    <Animated.View entering={FadeInLeft.delay(200)}>
      <TouchableOpacity 
        onPress={() => 
          navigation.navigate({
            name: Resources.Screens.TrainingPlanScreen, 
            params: { trainingPlanId: trainingPlan.id }
          })} 
        style={styles({theme: theme}).card}
      >
        <Text style={styles({theme: theme}).trainingPlanHeader}>{trainingPlan?.name}</Text>
        <View style={styles({theme: theme}).infoView}>
          <View
            style={{
              ...styles({theme: theme}).subView,
              paddingLeft: scale(10),
            }}>
            <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
            {trainingPlan.muscleGroups?.length > 0 ? trainingPlan.muscleGroups.map((x, i) => {
              return <Text key={i} style={styles({theme: theme}).text}>{x}</Text>;
            })
            : null}
          </View>
          <View
            style={{
              ...styles({theme: theme}).subView,
              paddingRight: scale(10),
              alignItems: 'flex-end',
            }}>
            <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
            {trainingPlan.equipment?.length > 0 ? (
              trainingPlan.equipment.map((x, i) => {
                return <Text key={i} style={styles({theme: theme}).text}>{x.name}</Text>;
              })
            ) : (
              <Text
                style={styles({theme: theme}).text}>{`${Resources.Texts.NoEquipment}`}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TrainingPlan;
