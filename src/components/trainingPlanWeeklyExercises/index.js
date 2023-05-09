import {View, Text} from 'react-native';
import React from 'react';
import {useContext} from 'react';
import TrainingPlanDayExercises from '../trainingPlanDayExercises';
import Resources from '../../Resources';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {UserContext} from '../../../App';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale} from 'react-native-size-matters';
import UserTrainingPlanExercises from '../userTrainingPlanDayExercises';

const TrainingPlanWeeklyExercises = ({
  navigation,
  planWeek,
  editMode,
  fetchedWeeklyPlan,
  theme,
}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

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
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Monday}
            planWeek={planWeek}
            planDay={Resources.Days.Monday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Monday}
            planWeek={planWeek}
            planDay={Resources.Days.Monday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Tuesday}
            planWeek={planWeek}
            planDay={Resources.Days.Tuesday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Tuesday}
            planWeek={planWeek}
            planDay={Resources.Days.Tuesday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Wednesday}
            planWeek={planWeek}
            planDay={Resources.Days.Wednesday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Wednesday}
            planWeek={planWeek}
            planDay={Resources.Days.Wednesday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Thursday}
            planWeek={planWeek}
            planDay={Resources.Days.Thursday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Thursday}
            planWeek={planWeek}
            planDay={Resources.Days.Thursday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Friday}
            planWeek={planWeek}
            planDay={Resources.Days.Friday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Friday}
            planWeek={planWeek}
            planDay={Resources.Days.Friday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Saturday}
            planWeek={planWeek}
            planDay={Resources.Days.Saturday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Saturday}
            planWeek={planWeek}
            planDay={Resources.Days.Saturday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
        {userData.role === 'Trainer' ? (
          <TrainingPlanDayExercises
            key={Resources.Days.Sunday}
            planWeek={planWeek}
            planDay={Resources.Days.Sunday}
            navigation={navigation}
            editMode={editMode}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        ) : (
          <UserTrainingPlanExercises
            key={Resources.Days.Sunday}
            planWeek={planWeek}
            planDay={Resources.Days.Sunday}
            navigation={navigation}
            fetchedWeeklyPlan={fetchedWeeklyPlan}
            theme={theme}
          />
        )}
      </View>
    </View>
  );
};

export default TrainingPlanWeeklyExercises;
