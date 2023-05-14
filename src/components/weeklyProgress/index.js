import {View} from 'react-native';
import React from 'react';
import { Text } from '@rneui/themed';
import styles from './styles';
import WeeklyChart from '../weeklyChart';

const WeeklyProgress = ({weekProgress, theme}) => {
  return (
    <View style={{alignItems: 'center', width: '100%', backgroundColor: theme.colors.background}}>
      <Text style={styles({theme: theme}).titleText}>Weekly progress</Text>
      <Text style={styles({theme: theme}).text}>Average weights</Text>
      <WeeklyChart data={weekProgress} isWeightChart={true} theme={theme} />
      <Text style={styles({theme: theme}).text}>Average repetitions</Text>
      <WeeklyChart data={weekProgress} isWeightChart={false} theme={theme} />
    </View>
  );
};

export default React.memo(WeeklyProgress);
