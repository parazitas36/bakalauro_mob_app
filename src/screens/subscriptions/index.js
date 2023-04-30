import {Text} from 'react-native';
import React, {useEffect, useContext, useState, Suspense} from 'react';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import Resources from '../../Resources';
import styles from './styles';
import Subscription from '../../components/subscription';
import {ScrollView} from 'react-native';
import { FAB, useTheme } from '@rneui/themed';

const Subscriptions = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {reloadSubscriptionsState} = useContext(SportsClubContext);
  const [reloadSubscriptions, setReloadSubscriptions] = reloadSubscriptionsState;

  const {theme} = useTheme();

  const [sportsClubName, setSportsClubName] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [roleSpecificData.id]}).Subscriptions,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setSportsClubName(data.sportsClubName);
        setSubscriptions(data.subscriptions);
      } else {
        setSportsClubName(Resources.Texts.UnknownClub);
        setSubscriptions([]);
      }
    })();

    setReloadSubscriptions(false);
  }, [reloadSubscriptions === true]);

  return (
    <Suspense fallback={LoadingScreen()}>
      {subscriptions === null ? (
        LoadingScreen()
      ) : (
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInLeft.delay(200)}
          exiting={FadeOutRight}>
          {subscriptions !== null && (
            <Text
              style={
                styles({theme: theme}).heading
              }>{`${sportsClubName} ${Resources.Texts.Subscriptions.toLowerCase()} (${
              subscriptions?.length
            })`}</Text>
          )}
          {subscriptions?.length === 0 ? (
            <Text style={styles({theme: theme}).text}>{Resources.Texts.NoSubscriptions}</Text>
          ) : (
            <ScrollView
              style={styles({theme: theme}).subscriptionsScrollView}
              contentContainerStyle={styles({theme: theme}).subscriptionsScrollViewContent}>
              {subscriptions?.map(x => {
                return <Subscription key={x.id} subscription={x} theme={theme}/>;
              })}
            </ScrollView>
          )}
          {subscriptions !== null ? (
            <FAB
              icon={{name: 'add', color: Resources.Colors.IconsColor}}
              color={theme.colors.primary}
              size="small"
              placement="right"
              onPress={() =>
                navigation.navigate(Resources.Screens.CreateSubscription)
              }
            />
          ) : null}
        </Animated.View>
      )}
    </Suspense>
  );
};

export default Subscriptions;
