import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense, useState} from 'react';
import {LoadingScreen, TrainerContext} from '../../App';
import Resources from '../Resources';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { verticalScale } from 'react-native-size-matters';

const TrainerTabNavigator = createMaterialBottomTabNavigator();
const TrainerHomeStackNavigator = createStackNavigator();
const TrainerExercisesStackNavigator = createStackNavigator();
const TrainerTrainingPlansStackNavigator = createStackNavigator();

const TrainerHome = React.lazy(() => import('../screens/trainerHome'));
const CreateExercise = React.lazy(() => import('../screens/createExercise'));
const Exercises = React.lazy(() => import('../screens/exercises'));
const Exercise = React.lazy(() => import('../screens/exercise'));
const CreateExerciseGuide = React.lazy(() => import('../screens/createExerciseGuide'));
const TrainingPlans = React.lazy(() => import('../screens/trainingPlans'));
const CreateTrainingPlan = React.lazy(() => import('../screens/createTrainingPlan'));
const AddExerciseSets = React.lazy(() => import('../screens/addExerciseSets'));
const TrainingPlanScreen = React.lazy(() => import('../screens/trainingPlanScreen'));

const TrainerHomeStack = () => {
  return (
    <TrainerHomeStackNavigator.Navigator
      initialRouteName={Resources.Screens.SCAdminHome}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <TrainerHomeStackNavigator.Screen
        name={Resources.Screens.TrainerHome}
        component={TrainerHome}
      />
    </TrainerHomeStackNavigator.Navigator>
  );
};

const TrainerExercisesStack = () => {
  return (
    <TrainerExercisesStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <TrainerExercisesStackNavigator.Screen
        name={Resources.Screens.Exercises}
        component={Exercises}
      />
      <TrainerExercisesStackNavigator.Screen
        name={Resources.Screens.Exercise}
        component={Exercise}
      />
      <TrainerExercisesStackNavigator.Screen
        name={Resources.Screens.CreateExercise}
        component={CreateExercise}
      />
      <TrainerExercisesStackNavigator.Screen
        name={Resources.Screens.CreateExerciseGuide}
        component={CreateExerciseGuide}
      />
    </TrainerExercisesStackNavigator.Navigator>
  );
};

const TrainerTrainingPlansStack = () => {
  return (
    <TrainerTrainingPlansStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <TrainerTrainingPlansStackNavigator.Screen
        name={Resources.Screens.TrainingPlans}
        component={TrainingPlans}
      />
      <TrainerTrainingPlansStackNavigator.Screen
        name={Resources.Screens.CreateTrainingPlan}
        component={CreateTrainingPlan}
      />
      <TrainerTrainingPlansStackNavigator.Screen
        name={Resources.Screens.AddExerciseSets}
        component={AddExerciseSets}
      />
      <TrainerTrainingPlansStackNavigator.Screen
        name={Resources.Screens.TrainingPlanScreen}
        component={TrainingPlanScreen}
      />
    </TrainerTrainingPlansStackNavigator.Navigator>
  );
};

const TrainerTab = () => {
  const [guide, setGuide] = useState([]);
  const [refreshExercises, setRefreshExercises] = useState(false);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = useState(false);
  const [key, setKey] = useState(0);
  const [weeks, setWeeks] = useState(null);
  const [exercises, setExercises] = useState(null);

  const context = {
    guideState: [guide, setGuide],
    refreshExercisesState: [refreshExercises, setRefreshExercises],
    refreshTrainingPlansState: [refreshTrainingPlans, setRefreshTrainingPlans],
    keyState: [key, setKey],
    weeksState: [weeks, setWeeks],
    exercisesState: [exercises, setExercises],
  };

  return (
    <TrainerContext.Provider value={context}>
      <TrainerTabNavigator.Navigator
        initialRouteName={'HomeStack'}
        activeColor="#f0edf6"
        inactiveColor="#2089DC"
        barStyle={{backgroundColor: 'black'}}>
        <TrainerTabNavigator.Screen
          name={'HomeStack'}
          component={TrainerHomeStack}
          options={{
            tabBarLabel: Resources.Screens.Home,
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={verticalScale(18)} />
            ),
          }}
        />
        <TrainerTabNavigator.Screen
          name={'ExercisesStack'}
          component={TrainerExercisesStack}
          options={{
            tabBarLabel: Resources.Screens.Exercises,
            tabBarIcon: ({ color }) => (
              <Icon name="dumbbell" color={color} size={verticalScale(18)} />
            ),
          }}
        />
        <TrainerTabNavigator.Screen
          name={'TrainingPlansStack'}
          component={TrainerTrainingPlansStack}
          options={{
            tabBarLabel: Resources.Screens.TrainingPlans,
            tabBarIcon: ({ color }) => (
              <Icon name="clipboard-list" color={color} size={verticalScale(18)} />
            ),
          }}
        />
      </TrainerTabNavigator.Navigator>
    </TrainerContext.Provider>
  );
};

const TrainerNavigator = createStackNavigator();
const TrainerStack = ({roleSpecificData}) => {

  return (
    <Suspense fallback={LoadingScreen()}>
      <TrainerNavigator.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animationEnabled: true,
          detachPreviousScreen: true,
        }}>
        <TrainerNavigator.Screen name="TrainerTab" component={TrainerTab} />
      </TrainerNavigator.Navigator>
    </Suspense>
  );
};

export default TrainerStack;
