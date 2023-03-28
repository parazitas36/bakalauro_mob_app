import {View, Text} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {UserContext} from '../../../App';
import CustomButton from '../../components/customButton';

const Subscriptions = () => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [roleSpecificData.id]}).Subscriptions,
        token: token,
      });
      console.log(resp);

      if (resp.status === 200) {
        const data = await resp.json();
        setSubscriptions(data)
      } else {
        setSubscriptions([])
      }
    })();
  }, []);

  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
        {subscriptions === null ? <Text style={{color: 'white'}}>Loading</Text>
        : subscriptions?.length === 0 ? <Text style={{color: 'white'}}>No subscriptions</Text>
        : subscriptions?.map((subs) => {
            return <Text style={{color: 'white'}}>{subs.id}</Text>
        })}
        {subscriptions !== null ? 
        <CustomButton btnText={'Create'} styles={styles}/> : null}
    </Animated.View>
  );
};

export default Subscriptions;
