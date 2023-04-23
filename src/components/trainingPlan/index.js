import React from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import {scale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TrainingPlan = ({navigation, trainingPlan}) => {
  return (
    <Animated.View entering={FadeInLeft.delay(200)}>
      <TouchableOpacity 
        onPress={() => 
          navigation.navigate({
            name: Resources.Screens.TrainingPlanScreen, 
            params: { trainingPlanId: trainingPlan.id }
          })} 
        style={styles.card}
      >
        <Text style={styles.trainingPlanHeader}>{trainingPlan?.name}</Text>
        <View style={styles.infoView}>
          <View
            style={{
              ...styles.subView,
              paddingLeft: scale(10),
            }}>
            <Text style={styles.boldText}>{Resources.Texts.MuscleGroups}</Text>
            {trainingPlan.muscleGroups?.length > 0 ? trainingPlan.muscleGroups.map((x, i) => {
              return <Text key={i} style={styles.text}>{x}</Text>;
            })
            : null}
          </View>
          <View
            style={{
              ...styles.subView,
              paddingRight: scale(10),
              alignItems: 'flex-end',
            }}>
            <Text style={styles.boldText}>{Resources.Texts.Equipment}</Text>
            {trainingPlan.equipment?.length > 0 ? (
              trainingPlan.equipment.map((x, i) => {
                return <Text key={i} style={styles.text}>{x.name}</Text>;
              })
            ) : (
              <Text
                style={styles.text}>{`${Resources.Texts.NoEquipment}`}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TrainingPlan;
