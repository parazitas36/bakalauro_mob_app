import {Text} from 'react-native';
import React, {useEffect, useContext, useState, Suspense} from 'react';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import Resources from '../../Resources';
import styles from './styles';
import Subscription from '../../components/subscription';
import {ScrollView} from 'react-native';

const Subscriptions = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {reloadSubscriptionsState} = useContext(SportsClubContext);
  const [reloadSubscriptions, setReloadSubscriptions] =
    reloadSubscriptionsState;

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
        setSportsClubName('Unknown club')
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
          style={styles.view}
          entering={FadeInLeft.delay(200)}
          exiting={FadeOutRight}>
          {subscriptions !== null && (
            <Text style={styles.heading}>{`${sportsClubName} subscriptions (${subscriptions?.length})`}</Text>
          )}
          {subscriptions?.length === 0 ? (
            <Text style={styles.text}>No subscriptions</Text>
          ) : (
            <ScrollView
              style={styles.subscriptionsScrollView}
              contentContainerStyle={styles.subscriptionsScrollViewContent}>
              {subscriptions?.map(x => {
                return <Subscription key={x.id} subscription={x} />;
              })}
            </ScrollView>
          )}
          {subscriptions !== null ? (
            <CustomButton
              btnText={Resources.ButtonTexts.CreateNewBtnText}
              styles={styles}
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
