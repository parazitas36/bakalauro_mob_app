import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, { Suspense, useState } from 'react';
import { LoadingScreen, TrainerContext } from '../../App';
import Resources from '../Resources';

const TrainerTabNavigator = createMaterialBottomTabNavigator();
const TrainerHomeStackNavigator = createStackNavigator();
const TrainerExercisesStackNavigator = createStackNavigator();

const TrainerHome = React.lazy(() => import('../screens/trainerHome'));
const CreateExercise = React.lazy(() => import('../screens/createExercise'));
const Exercises = React.lazy(() => import('../screens/exercises'));
const CreateExerciseGuide = React.lazy(() => import('../screens/createExerciseGuide'));

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
      <TrainerExercisesStackNavigator.Screen name='Exercises' component={Exercises}/>
      <TrainerExercisesStackNavigator.Screen name='CreateExercise' component={CreateExercise}/>
      <TrainerExercisesStackNavigator.Screen name='CreateExerciseGuide' component={CreateExerciseGuide}/>
    </TrainerExercisesStackNavigator.Navigator>
  )
}

const TrainerTab = () => {
  return (
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
    </TrainerTabNavigator.Navigator>
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
            <TrainerNavigator.Screen
              name="TrainerTab"
              component={TrainerTab}
            />
        </TrainerNavigator.Navigator>
      </TrainerContext.Provider>
    </Suspense>
  );
};

export default TrainerStack;
