import {Text, useTheme} from '@rneui/themed';
import {Animated} from 'react-native';
import styles from './styles';
import React from 'react';
import { Suspense } from 'react';
import { LoadingScreen, UserContext } from '../../../App';
import { FadeInLeft } from 'react-native-reanimated';
import { useContext } from 'react';
import TrainerInvitesList from '../../components/trainerInvites';

const TrainerInvites = ({navigation}) => {
  const {theme} = useTheme();
  const {tokenState} = useContext(UserContext);
  const [token, setToken] = tokenState;

  return (
    <Suspense fallback={LoadingScreen()}>
        <Animated.View 
          entering={FadeInLeft.delay(200)}
          style={styles({theme: theme}).view}>
            <Text h4>My invites</Text>
            <TrainerInvitesList theme={theme} token={token} navigation={navigation} />
        </Animated.View>
    </Suspense>
  );
};

export default TrainerInvites;
