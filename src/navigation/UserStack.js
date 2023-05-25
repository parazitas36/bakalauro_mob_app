import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense, useState} from 'react';
import {LoadingScreen, RegularUserContext} from '../../App';
import Resources from '../Resources';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '@rneui/themed';

const UserTabNavigator = createMaterialBottomTabNavigator();
const UserHomeStackNavigator = createStackNavigator();
const UserTrainingPlanStackNavigator = createStackNavigator();

const UserHome = React.lazy(() => import('../screens/userHome'));
const SportsClubs = React.lazy(() => import('../screens/sportsClubs'));
const UserForms = React.lazy(() => import('../screens/userForms'));
const CreateTrainingPlanForm = React.lazy(() => import('../screens/createTrainingPlanForm'));
const Trainers = React.lazy(() => import('../screens/trainers'));
const Trainer = React.lazy(() => import('../screens/trainer'));
const BodyMeasurements = React.lazy(() => import('../screens/bodyMeasurements'));
const AddBodyMeasurements = React.lazy(() => import('../screens/addBodyMeasuremets'));
const UserMyForms = React.lazy(() => import('../screens/userMyForms'));
const UserTrainingPlans = React.lazy(() => import('../screens/userTrainingPlans'));
const TrainingPlanScreen = React.lazy(() => import('../screens/trainingPlanScreen'));
const WorkoutScreen = React.lazy(() => import('../screens/workoutScreen'));
const BodyMeasurementsProgress = React.lazy(() => import('../screens/bodyMeasurementsProgress'));
const ClientTrainingPlanProgress = React.lazy(() => import('../screens/clientTrainingPlanProgress'));
const Exercise = React.lazy(() => import('../screens/exercise'));
const SportsClub = React.lazy(() => import('../screens/sportsClub'));
const Facility = React.lazy(() => import('../screens/facility'));

const UserHomeStack = () => {
  return (
    <UserHomeStackNavigator.Navigator
      initialRouteName={'UserHome'}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <UserHomeStackNavigator.Screen
        name={'UserHome'}
        component={UserHome}
      />
      <UserHomeStackNavigator.Screen
        name={'SportsClubs'}
        component={SportsClubs}
      />
      <UserHomeStackNavigator.Screen
        name={'SportsClub'}
        component={SportsClub}
      />
      <UserHomeStackNavigator.Screen
        name={'UserMyForms'}
        component={UserMyForms}
      />
      <UserHomeStackNavigator.Screen
        name={'CreateTrainingPlanForm'}
        component={CreateTrainingPlanForm}
      />
      <UserHomeStackNavigator.Screen
        name={'Trainers'}
        component={Trainers}
      />
      <UserHomeStackNavigator.Screen
        name={'Trainer'}
        component={Trainer}
      />
      <UserHomeStackNavigator.Screen
        name={'BodyMeasurements'}
        component={BodyMeasurements}
      />
      <UserHomeStackNavigator.Screen
        name={'AddBodyMeasurements'}
        component={AddBodyMeasurements}
      />
      <UserHomeStackNavigator.Screen
        name={'BodyMeasurementsProgress'}
        component={BodyMeasurementsProgress}
      />
      <UserHomeStackNavigator.Screen
        name={'Facility'}
        component={Facility}
      />
    </UserHomeStackNavigator.Navigator>
  );
};

const UserTrainingPlanStack = () => {
  return (
    <UserTrainingPlanStackNavigator.Navigator
      initialRouteName={'UserHome'}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <UserTrainingPlanStackNavigator.Screen
        name={'UserTrainingPlans'}
        component={UserTrainingPlans}
      />
      <UserTrainingPlanStackNavigator.Screen
        name={Resources.Screens.TrainingPlanScreen}
        component={TrainingPlanScreen}
      />
      <UserTrainingPlanStackNavigator.Screen
        name={'WorkoutScreen'}
        component={WorkoutScreen}
      />
      <UserTrainingPlanStackNavigator.Screen
        name={'ClientTrainingPlanProgress'}
        component={ClientTrainingPlanProgress}
      />
      <UserTrainingPlanStackNavigator.Screen
        name={Resources.Screens.Exercise}
        component={Exercise}
      />
    </UserTrainingPlanStackNavigator.Navigator>
  )
}

const UserTab = () => {
  const {theme} = useTheme();
  const [reloadWorkout, setReloadWorkout] = useState(false);
  const [reloadBodyMeasurements, setReloadBodyMeasurements] = useState(false);

  const context = {
    reloadWorkoutState: [reloadWorkout, setReloadWorkout],
    reloadBodyMeasurementsState: [reloadBodyMeasurements, setReloadBodyMeasurements],
  };

  return (
    <RegularUserContext.Provider value={context}>
      <UserTabNavigator.Navigator
        initialRouteName={'HomeStack'}
        activeColor={theme.colors.primary}
        inactiveColor={theme.mode === 'dark' ? theme.colors.greyOutline : theme.colors.secondary}
        barStyle={{backgroundColor: theme.colors.background, borderTopColor: theme.colors.black, borderTopWidth: 0.2}}>
        <UserTabNavigator.Screen
          name={'HomeStack'}
          component={UserHomeStack}
          options={{
            tabBarLabel: Resources.Screens.Home,
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={verticalScale(18)} />
            ),
          }}
        />
        <UserTabNavigator.Screen
          name={'UserTrainingPlanStack'}
          component={UserTrainingPlanStack}
          options={{
            tabBarLabel: Resources.Screens.TrainingPlans,
            tabBarIcon: ({ color }) => (
              <Icon name="clipboard-list" color={color} size={verticalScale(18)} />
            ),
          }}
        />
      </UserTabNavigator.Navigator>
    </RegularUserContext.Provider>
  );
};

const UserNavigator = createStackNavigator();
const UserStack = ({roleSpecificData}) => {
  return (
    <Suspense fallback={LoadingScreen()}>
      <UserNavigator.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animationEnabled: true,
          detachPreviousScreen: true,
        }}>
        <UserNavigator.Screen name="UserTab" component={UserTab} />
      </UserNavigator.Navigator>
    </Suspense>
  );
};

export default UserStack;
