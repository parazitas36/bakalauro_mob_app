import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, Suspense, useState} from 'react';
import {LoadingScreen, TrainerContext} from '../../App';
import Resources from '../Resources';

const TrainerTabNavigator = createMaterialBottomTabNavigator();
const TrainerHomeStackNavigator = createStackNavigator();
const TrainerExercisesStackNavigator = createStackNavigator();
const TrainerTrainingPlansStackNavigator = createStackNavigator();

const TrainerHome = React.lazy(() => import('../screens/trainerHome'));
const CreateExercise = React.lazy(() => import('../screens/createExercise'));
const Exercises = React.lazy(() => import('../screens/exercises'));
const Exercise = React.lazy(() => import('../screens/exercise'));
const CreateExerciseGuide = React.lazy(() =>
  import('../screens/createExerciseGuide'),
);
const TrainingPlans = React.lazy(() => import('../screens/trainingPlans'));

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
        name="Exercises"
        component={Exercises}
      />
      <TrainerExercisesStackNavigator.Screen
        name="Exercise"
        component={Exercise}
      />
      <TrainerExercisesStackNavigator.Screen
        name="CreateExercise"
        component={CreateExercise}
      />
      <TrainerExercisesStackNavigator.Screen
        name="CreateExerciseGuide"
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
        name="TrainingPlans"
        component={TrainingPlans}
      />
    </TrainerTrainingPlansStackNavigator.Navigator>
  );
};

const TrainerTab = () => {
  const [guide, setGuide] = useState([]);
  const [refreshExercises, setRefreshExercises] = useState(false);

  const context = {
    guideState: [guide, setGuide],
    refreshExercisesState: [refreshExercises, setRefreshExercises],
  };

  return (
    <TrainerContext.Provider value={context}>
      <TrainerTabNavigator.Navigator
        initialRouteName={'HomeStack'}
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: 'black'}}>
        <TrainerTabNavigator.Screen
          name={'HomeStack'}
          component={TrainerHomeStack}
        />
        <TrainerTabNavigator.Screen
          name={'ExercisesStack'}
          component={TrainerExercisesStack}
        />
        <TrainerTabNavigator.Screen
          name={'TrainingPlansStack'}
          component={TrainerTrainingPlansStack}
        />
      </TrainerTabNavigator.Navigator>
    </TrainerContext.Provider>
  );
};

const TrainerNavigator = createStackNavigator();
const TrainerStack = ({roleSpecificData}) => {
  const [reloadFacilities, setReloadFacilities] = useState(false);
  const [reloadSubscriptions, setReloadSubscriptions] = useState(false);

  const contextValues = {
    reloadFacilitiesState: [reloadFacilities, setReloadFacilities],
    reloadSubscriptionsState: [reloadSubscriptions, setReloadSubscriptions],
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <TrainerContext.Provider value={contextValues}>
        <TrainerNavigator.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'card',
            animationEnabled: true,
            detachPreviousScreen: true,
          }}>
          <TrainerNavigator.Screen name="TrainerTab" component={TrainerTab} />
        </TrainerNavigator.Navigator>
      </TrainerContext.Provider>
    </Suspense>
  );
};

export default TrainerStack;
