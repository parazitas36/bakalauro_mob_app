import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Suspense, useState} from 'react';
import {LoadingScreen, SportsClubContext} from '../../App';
import Resources from '../Resources';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { verticalScale } from 'react-native-size-matters';

const SCAdminHome = React.lazy(() => import('../screens/scAdminHome'));
const Facilities = React.lazy(() => import('../screens/facilities'));
const Facility = React.lazy(() => import('../screens/facility'));
const CreateFacility = React.lazy(() => import('../screens/createFacility'));
const CreateSubscription = React.lazy(() => import('../screens/createSubscription'));
const Subscriptions = React.lazy(() => import('../screens/subscriptions'));
const SportsClubCreation = React.lazy(() => import('../screens/sportsClubCreation'));
const EquipmentList = React.lazy(() => import('../components/equipmentList'));
const CreateEquipment = React.lazy(() => import('../screens/createEquipment'));
const Trainers = React.lazy(() => import('../screens/trainers'));
const Trainer = React.lazy(() => import('../screens/trainer'));

const SCAdminTabNavigator = createMaterialBottomTabNavigator();
const SCAdminHomeStackNav = createStackNavigator();
const SCAdminFacilitiesStackNav = createStackNavigator();
const SCAdminSubscriptionsStackNav = createStackNavigator();
const SCAdminEquipmentListStackNav = createStackNavigator();

const noRoleSpecificData = data => {
  return data === null || data === '';
};

const SCAdminHomeStack = () => {
  return (
    <SCAdminHomeStackNav.Navigator
      initialRouteName={Resources.Screens.SCAdminHome}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SCAdminHomeStackNav.Screen
        name={Resources.Screens.SCAdminHome}
        component={SCAdminHome}
      />
      <SCAdminHomeStackNav.Screen
        name={'Trainers'}
        component={Trainers}
      />
      <SCAdminHomeStackNav.Screen
        name={'Trainer'}
        component={Trainer}
      />
    </SCAdminHomeStackNav.Navigator>
  );
};

const SCAdminFacilitiesStack = () => {
  return (
    <SCAdminFacilitiesStackNav.Navigator
      initialRouteName={Resources.Screens.Facilities}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SCAdminFacilitiesStackNav.Screen
        name={Resources.Screens.Facilities}
        component={Facilities}
      />
      <SCAdminFacilitiesStackNav.Screen 
        name={Resources.Screens.Facility}
        component={Facility} />
      <SCAdminFacilitiesStackNav.Screen
        name={Resources.Screens.CreateFacility}
        component={CreateFacility}
      />
      <SCAdminEquipmentListStackNav.Screen
        name={Resources.Screens.EquipmentList}
        component={EquipmentList}
      />
    </SCAdminFacilitiesStackNav.Navigator>
  );
};

const SCAdminSubscriptionsStack = () => {
  return (
    <SCAdminSubscriptionsStackNav.Navigator
      initialRouteName={Resources.Screens.Subscriptions}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SCAdminSubscriptionsStackNav.Screen
        name={Resources.Screens.Subscriptions}
        component={Subscriptions}
      />
      <SCAdminSubscriptionsStackNav.Screen
        name={Resources.Screens.CreateSubscription}
        component={CreateSubscription}
      />
    </SCAdminSubscriptionsStackNav.Navigator>
  );
};

const SCAdminEquipmentListStack = () => {
  return (
    <SCAdminEquipmentListStackNav.Navigator
      initialRouteName={Resources.Screens.Subscriptions}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SCAdminEquipmentListStackNav.Screen
        name={Resources.Screens.EquipmentList}
        component={EquipmentList}
      />
       <SCAdminEquipmentListStackNav.Screen
        name={Resources.Screens.CreateEquipment}
        component={CreateEquipment}
      />
    </SCAdminEquipmentListStackNav.Navigator>
  );
}

const SCAdminTab = () => {
  return (
    <SCAdminTabNavigator.Navigator
      initialRouteName={'HomeStack'}
      activeColor="#f0edf6"
      inactiveColor="#2089DC"
      barStyle={{backgroundColor: 'black'}}>
      <SCAdminTabNavigator.Screen
        name={'HomeStack'}
        component={SCAdminHomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={verticalScale(18)} />
          ),
        }}
      />
      <SCAdminTabNavigator.Screen
        name={'FacilitiesStack'}
        component={SCAdminFacilitiesStack}
        options={{
          tabBarLabel: 'Facilities',
          tabBarIcon: ({ color }) => (
            <Icon name="city" color={color} size={verticalScale(18)} />
          ),
        }}
      />
      <SCAdminTabNavigator.Screen
        name={'SubscriptionsStack'}
        component={SCAdminSubscriptionsStack}
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({ color }) => (
            <Icon name="credit-card" color={color} size={verticalScale(18)} />
          ),
        }}
      />
      <SCAdminTabNavigator.Screen
        name={'EquipmentListStack'}
        component={SCAdminEquipmentListStack}
        options={{
          tabBarLabel: 'Equipment',
          tabBarIcon: ({ color }) => (
            <Icon name="dumbbell" color={color} size={verticalScale(18)} />
          ),
        }}
      />
    </SCAdminTabNavigator.Navigator>
  );
};

const SCAdminNavigator = createStackNavigator();
const SCAdminStack = ({roleSpecificData}) => {
  const [reloadFacilities, setReloadFacilities] = useState(false);
  const [reloadSubscriptions, setReloadSubscriptions] = useState(false);

  const contextValues = {
    reloadFacilitiesState: [reloadFacilities, setReloadFacilities],
    reloadSubscriptionsState: [reloadSubscriptions, setReloadSubscriptions],
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <SportsClubContext.Provider value={contextValues}>
        <SCAdminNavigator.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'card',
            animationEnabled: true,
            detachPreviousScreen: true,
          }}>
          {noRoleSpecificData(roleSpecificData) ? (
            <SCAdminNavigator.Screen
              name={Resources.Screens.SportsClubCreation}
              component={SportsClubCreation}
            />
          ) : (
            <SCAdminNavigator.Screen
              name="SportsClubAdminTab"
              component={SCAdminTab}
            />
          )}
        </SCAdminNavigator.Navigator>
      </SportsClubContext.Provider>
    </Suspense>
  );
};

export default SCAdminStack;
