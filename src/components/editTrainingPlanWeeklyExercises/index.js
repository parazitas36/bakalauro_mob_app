import {View, Text} from 'react-native';
import React from 'react';
import Resources from '../../Resources';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale} from 'react-native-size-matters';
import EditTrainingPlanDayExercises from '../editTrainingPlanDayExercises';

const EditTrainingPlanWeeklyExercises = ({
  navigation,
  planWeek,
  theme,
  trainingPlanId
}) => {

  const [hidden, setHidden] = useState(false);

  return (
    <View style={styles({theme}).view}>
      <TouchableOpacity
        style={styles({theme}).headingView}
        onPress={() => setHidden(prev => !prev)}>
        <Text style={styles({theme}).heading}>
          {Resources.Texts.Week} {planWeek}
        </Text>
        <Icon
          name={`${hidden ? 'chevron-down' : 'chevron-up'}`}
          color={Resources.Colors.IconsColor}
          style={styles({theme}).icon}
          size={scale(15)}
        />
      </TouchableOpacity>
      <View style={hidden ? styles({theme}).hiddenView : null}>
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Monday}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Tuesday}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Wednesday}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Thursday}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Friday}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Saturday}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
        <EditTrainingPlanDayExercises
          planDay={Resources.Days.Sunday.toLowerCase()}
          planWeek={planWeek}
          navigation={navigation}
          theme={theme}
          trainingPlanId={trainingPlanId}
        />
      </View>
    </View>
  );
};

export default EditTrainingPlanWeeklyExercises;
