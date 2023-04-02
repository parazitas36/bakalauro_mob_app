import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Suspense, useState } from "react";
import { LoadingScreen, SportsClubContext } from "../../App";
import Resources from "../Resources";

const Home = React.lazy(() => import("../screens/home"));
const Facilities = React.lazy(() => import("../screens/facilities"));
const Facility = React.lazy(() => import("../screens/facility"));
const CreateFacility = React.lazy(() => import("../screens/createFacility"));
const CreateSubscription = React.lazy(() => import("../screens/createSubscription"))
const Subscriptions = React.lazy(() => import("../screens/subscriptions"));
const SportsClubCreation = React.lazy(() => import("../screens/sportsClubCreation"));

const SCAdminTabNavigator = createMaterialBottomTabNavigator();
const SCAdminHomeStackNav = createStackNavigator();
const SCAdminFacilitiesStackNav = createStackNavigator();
const SCAdminSubscriptionsStackNav = createStackNavigator();

const noRoleSpecificData = (data) => {
  return data === null || data === '';
}

const SCAdminHomeStack = () => {
  return (
    <SCAdminHomeStackNav.Navigator
      initialRouteName={Resources.Screens.Home}
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
        detachPreviousScreen: true,
      }}>
      <SCAdminHomeStackNav.Screen name={Resources.Screens.Home} component={Home}/>
    </SCAdminHomeStackNav.Navigator>
  )
}

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
      <SCAdminFacilitiesStackNav.Screen name={Resources.Screens.Facilities} component={Facilities}/>
      <SCAdminFacilitiesStackNav.Screen name='Facility' component={Facility}/>
      <SCAdminFacilitiesStackNav.Screen name={Resources.Screens.CreateFacility} component={CreateFacility}/>
    </SCAdminFacilitiesStackNav.Navigator>
  )
}

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
      <SCAdminSubscriptionsStackNav.Screen name={Resources.Screens.Subscriptions} component={Subscriptions}/>
      <SCAdminSubscriptionsStackNav.Screen name={Resources.Screens.CreateSubscription} component={CreateSubscription}/>
    </SCAdminSubscriptionsStackNav.Navigator>
  )
}
const SCAdminTab = () => {
  return (
    <SCAdminTabNavigator.Navigator
      initialRouteName={'HomeStack'}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: 'black'}}>
      <SCAdminTabNavigator.Screen name={'HomeStack'} component={SCAdminHomeStack} />
      <SCAdminTabNavigator.Screen name={'FacilitiesStack'}  component={SCAdminFacilitiesStack} />
      <SCAdminTabNavigator.Screen name={'SubscriptionsStack'}  component={SCAdminSubscriptionsStack} />
    </SCAdminTabNavigator.Navigator>
  );
};

const SCAdminNavigator = createStackNavigator();
const SCAdminStack = ({roleSpecificData}) => {
  const [reloadFacilities, setReloadFacilities] = useState(false)
  const [reloadSubscriptions, setReloadSubscriptions] = useState(false)

  const contextValues = {
    reloadFacilitiesState: [reloadFacilities, setReloadFacilities],
    reloadSubscriptionsState: [reloadSubscriptions, setReloadSubscriptions],
  }

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

export default SCAdminStack