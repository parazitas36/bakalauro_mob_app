import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { scale, verticalScale } from 'react-native-size-matters';
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft, FadeOutRight } from 'react-native-reanimated';
import { useTheme, Text, Card, Icon } from '@rneui/themed';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { useState } from 'react';
import UserTrainingPlanExerciseWithSets from '../../components/userTrainingPlanExerciseWithSets';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogSetComponent from '../../components/logSetComponent';
import { FlatList } from 'react-native';
import LoggedSetComponent from '../../components/loggedSetComponent';
import { useMemo } from 'react';

const WorkoutScreen = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const dayTrainingPlan = route?.params?.dayTrainingPlan;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(dayTrainingPlan.at(currentIndex))
  const [loggedSets, setLoggedSets] = useState(dayTrainingPlan.filter(x => x.loggedSets !== null).map(x => {
    return {trainingPlanExerciseId: x.trainingPlanExerciseId, loggedSets: JSON.parse(x.loggedSets)}
  }));
  
  const isFirst = dayTrainingPlan.at(0)?.trainingPlanExerciseId === currentExercise.trainingPlanExerciseId
  const isLast = dayTrainingPlan.at(-1)?.trainingPlanExerciseId === currentExercise.trainingPlanExerciseId

  const {theme} = useTheme();

  const CountOfExerciseSets = useMemo(() => {
    return loggedSets?.filter(x => x.trainingPlanExerciseId === currentExercise.trainingPlanExerciseId)?.at(0)?.loggedSets?.length;
  }, [loggedSets, currentExercise])

  return (
    <Animated.View 
      style={styles({theme:theme}).mainView}
      entering={FadeInLeft.delay(200)}>
      <Animated.ScrollView
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).viewContainer}>
          {currentExercise && <UserTrainingPlanExerciseWithSets data={currentExercise} theme={theme} userData={userData} navigation={navigation}/>}
          <LogSetComponent 
            token={token}
            sets={currentExercise.sets} 
            loggedSets={loggedSets} 
            setLoggedSets={setLoggedSets} 
            trainingPlanExerciseId={currentExercise.trainingPlanExerciseId} />
          {loggedSets.filter(x => x.trainingPlanExerciseId === currentExercise.trainingPlanExerciseId)?.at(0)?.loggedSets?.map((x, i) => {
            return <LoggedSetComponent 
                      setLoggedSets={setLoggedSets}
                      loggedSets={loggedSets}
                      key={i}
                      index={i}
                      trainingPlanExerciseId={currentExercise.trainingPlanExerciseId}
                      theme={theme}
                      data={x}
                      token={token}
                    />
          })}
      </Animated.ScrollView>
      <Animated.View entering={FadeInLeft.delay(200)} style={styles({theme: theme}).flexRow}>
            {isFirst === false ?
            <Animated.View entering={FadeInLeft.delay(300)} exiting={FadeOutLeft}>
              <TouchableOpacity
                onPress={() => {
                    setCurrentExercise(dayTrainingPlan.at(currentIndex-1));
                    setCurrentIndex(prev => prev-1)
                }}>
                <Card containerStyle={styles({theme: theme}).cardButtons}>
                  <Card.Title>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                      <Icon size={verticalScale(16)} name='arrow-left' type='font-awesome'/>
                      <Text style={{fontSize: verticalScale(14), fontWeight: 'bold'}}>Previous</Text>
                    </View>
                  </Card.Title>
                  <Text style={styles({theme:theme}).exerciseTitleCard}>{dayTrainingPlan.at(currentIndex-1).exerciseName}</Text>
                </Card>
              </TouchableOpacity>
            </Animated.View> : null}
            {isLast === false ?
            <Animated.View entering={FadeInRight.delay(300)} exiting={FadeOutRight}>
              <TouchableOpacity
                onPress={() => {
                    setCurrentExercise(dayTrainingPlan.at(currentIndex+1));
                    setCurrentIndex(prev => prev+1)
                }}>
                <Card containerStyle={styles({theme: theme}).cardButtons}>
                  <Card.Title>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                      <Text style={{fontSize: verticalScale(14), fontWeight: 'bold'}}>Next</Text>
                      <Icon size={verticalScale(16)} name='arrow-right' type='font-awesome'/>
                    </View>
                  </Card.Title>
                  <Text style={styles({theme:theme}).exerciseTitleCard}>{dayTrainingPlan.at(currentIndex+1).exerciseName}</Text>
                </Card>
              </TouchableOpacity>
            </Animated.View> : null}
          </Animated.View>
    </Animated.View>
  );
};

export default WorkoutScreen;
