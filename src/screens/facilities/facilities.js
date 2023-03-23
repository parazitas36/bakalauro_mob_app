import {View} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import { UserContext } from '../../../App';

const Facilities = (props) => {
  const {tokenState, userDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  
  return (
    <Animated.View style={styles.view} entering={FadeInLeft} exiting={FadeOutLeft}>
      
    </Animated.View>
  );
};

export default Login;
