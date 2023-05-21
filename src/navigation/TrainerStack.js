import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense, useState} from 'react';
import {LoadingScreen, TrainerContext} from '../../App';
import Resources from '../Resources';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {verticalScale} from 'react-native-size-matters';
import {useTheme} from '@rneui/themed';

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
const UserForms = React.lazy(() => import('../screens/userForms'));
const CreateTrainingPlanOffer = React.lazy(() => import('../screens/createTrainingPlanOffer'));
const TrainerMyForms = React.lazy(() => import('../screens/trainerMyForms'));
const AssignTrainingPlan = React.lazy(() => import('../screens/assignTrainingPlan'));
const Clients = React.lazy(() => import('../screens/clients'));
const ClientTrainingPlans = React.lazy(() => import('../screens/clientTrainingPlans'));
const ClientTrainingPlanProgress = React.lazy(() => import('../screens/clientTrainingPlanProgress'));
const EditTrainingPlan = React.lazy(() => import('../screens/editTrainingPlan'));
const EditExerciseSets = React.lazy(() => import('../screens/editExerciseSets'));
const FindAndAssignClientScreen = React.lazy(() => import('../screens/findAndAssignClientScreen'));
const TrainerInvites = React.lazy(() => import('../screens/trainerInvites'));
const SportsClub = React.lazy(() => import('../screens/sportsClub'));

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
      <TrainerHomeStackNavigator.Screen
        name={'UserForms'}
        component={UserForms}
      />
      <TrainerHomeStackNavigator.Screen
        name={'CreateTrainingPlanOffer'}
        component={CreateTrainingPlanOffer}
      />
      <TrainerHomeStackNavigator.Screen
        name={'TrainerMyForms'}
        component={TrainerMyForms}
      />
      <TrainerHomeStackNavigator.Screen
        name={'AssignTrainingPlan'}
        component={AssignTrainingPlan}
      />
      <TrainerHomeStackNavigator.Screen
        name={'Clients'}
        component={Clients}
      />
      <TrainerHomeStackNavigator.Screen
        name={'ClientTrainingPlans'}
        component={ClientTrainingPlans}
      />
      <TrainerHomeStackNavigator.Screen
        name={'TrainingPlanScreen'}
        component={TrainingPlanScreen}
      />
      <TrainerHomeStackNavigator.Screen
        name={'ClientTrainingPlanProgress'}
        component={ClientTrainingPlanProgress}
      />
      <TrainerHomeStackNavigator.Screen
        name={'EditTrainingPlan'}
        component={EditTrainingPlan}
      />
      <TrainerHomeStackNavigator.Screen
        name={'EditExerciseSets'}
        component={EditExerciseSets}
      />
      <TrainerHomeStackNavigator.Screen
        name={'FindAndAssignClientScreen'}
        component={FindAndAssignClientScreen}
      />
      <TrainerHomeStackNavigator.Screen
        name={Resources.Screens.Exercise}
        component={Exercise}
      />
      <TrainerHomeStackNavigator.Screen
        name={'TrainerInvites'}
        component={TrainerInvites}
      />
      <TrainerHomeStackNavigator.Screen
        name={'SportsClub'}
        component={SportsClub}
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
      <TrainerTrainingPlansStackNavigator.Screen
        name={'EditTrainingPlan'}
        component={EditTrainingPlan}
      />
      <TrainerTrainingPlansStackNavigator.Screen
        name={'EditExerciseSets'}
        component={EditExerciseSets}
      />
      <TrainerTrainingPlansStackNavigator.Screen
        name={'FindAndAssignClientScreen'}
        component={FindAndAssignClientScreen}
      />
      <TrainerTrainingPlansStackNavigator.Screen
        name={Resources.Screens.Exercise}
        component={Exercise}
      />
    </TrainerTrainingPlansStackNavigator.Navigator>
  );
};

const TrainerTab = () => {
  const {theme} = useTheme();
  const [guide, setGuide] = useState([]);
  const [refreshExercises, setRefreshExercises] = useState(false);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = useState(false);
  const [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode] = useState(false);
  const [key, setKey] = useState(0);
  const [weeks, setWeeks] = useState(null);
  const [exercises, setExercises] = useState(null);

  const context = {
    guideState: [guide, setGuide],
    refreshExercisesState: [refreshExercises, setRefreshExercises],
    refreshTrainingPlansState: [refreshTrainingPlans, setRefreshTrainingPlans],
    refreshTrainingPlanInEditModeState: [refreshTrainingPlanInEditMode, setRefreshTrainingPlanInEditMode],
    keyState: [key, setKey],
    weeksState: [weeks, setWeeks],
    exercisesState: [exercises, setExercises],
  };

  return (
    <TrainerContext.Provider value={context}>
      <TrainerTabNavigator.Navigator
        initialRouteName={'HomeStack'}
        activeColor={theme.colors.primary}
        inactiveColor={theme.mode === 'dark' ? theme.colors.greyOutline : theme.colors.secondary}
        barStyle={{backgroundColor: theme.colors.background, borderTopColor: theme.colors.black, borderTopWidth: 0.2}}>
        <TrainerTabNavigator.Screen
          name={'HomeStack'}
          component={TrainerHomeStack}
          options={{
            tabBarLabel: Resources.Screens.Home,
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={verticalScale(18)} />
            ),
          }}
        />
        <TrainerTabNavigator.Screen
          name={'ExercisesStack'}
          component={TrainerExercisesStack}
          options={{
            tabBarLabel: Resources.Screens.Exercises,
            tabBarIcon: ({color}) => (
              <Icon name="dumbbell" color={color} size={verticalScale(18)} />
            ),
          }}
        />
        <TrainerTabNavigator.Screen
          name={'TrainingPlansStack'}
          component={TrainerTrainingPlansStack}
          options={{
            tabBarLabel: 'Training Plans',
            tabBarIcon: ({color}) => (
              <Icon
                name="clipboard-list"
                color={color}
                size={verticalScale(18)}
              />
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
