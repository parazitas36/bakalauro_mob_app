import {Text, useTheme} from '@rneui/themed';
import {Animated} from 'react-native';
import styles from './styles';
import React from 'react';
import { Suspense } from 'react';
import { LoadingScreen } from '../../../App';
import { FadeInLeft } from 'react-native-reanimated';
import TrainerTrainingPlanOffers from '../../components/trainerTrainingPlanOffers';

const TrainerMyForms = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <Suspense fallback={LoadingScreen()}>
        <Animated.View 
          entering={FadeInLeft.delay(200)}
          style={styles({theme: theme}).view}>
            <Text style={styles({theme: theme}).heading}>My training plan offers</Text>
            <TrainerTrainingPlanOffers navigation={navigation} />
        </Animated.View>
    </Suspense>
  );
};

export default TrainerMyForms;
