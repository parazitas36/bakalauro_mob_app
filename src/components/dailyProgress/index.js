import {View} from 'react-native';
import React from 'react';
import styles from './styles'
import { Text } from '@rneui/themed';
import DailyChart from '../dailyChart';

const DailyProgress = ({data, theme}) => {
  return (
    <View style={{alignItems: 'center', width: '100%', backgroundColor: theme.colors.background}}>
      <Text style={styles({theme: theme}).titleText}>Week {data.week}</Text>
      <Text style={styles({theme: theme}).text}>Average weights</Text>
      <DailyChart data={data.data} isWeightChart={true} theme={theme} />
      <Text style={styles({theme: theme}).text}>Average repetitions</Text>
      <DailyChart data={data.data} isWeightChart={false} theme={theme} />
    </View>
  );
};

export default React.memo(DailyProgress);
