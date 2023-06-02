import {View} from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import { LineChart } from 'react-native-chart-kit';
import { Text } from '@rneui/themed';

const WeeklyChart = ({data, isWeightChart, theme}) => {
  const weeks = [];
  var maxWeek = data[0]?.week;
  data.forEach(x => {
    if (Number(x.week) > maxWeek) {
      maxWeek = x.week;
    }
  });

  for (var i = 1; i <= maxWeek; i++) {
    if (!weeks.includes(i)) {
      weeks.push(i);
    }
  }

  const setsData = weeks.map(week => {
    const found = data.filter(x => x.week === week);
    if (found?.length > 0) {
      return isWeightChart
        ? found[0].expectedWeightAvg
        : found[0].expectedRepsAvg;
    } else {
      return null;
    }
  });

  const loggedSetsData = weeks.map(week => {
    const found = data.filter(x => x.week === week);
    if (found?.length > 0) {
      return isWeightChart ? found[0].weightAvg : found[0].repsAvg;
    } else {
      return null;
    }
  });

  const show = loggedSetsData?.filter(x => x !== null).length > 0

  const hidePoints = weeks.map((x, i) => {
      if (data.filter(y => y.week === x).length === 0) {
        return i;
      }
      if (loggedSetsData[i] === null && setsData.filter(x => x !== null).length > 1) {
        loggedSetsData[i] = 0;
      }
    }).filter(x => x !== undefined);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      {show ?
      <LineChart
        data={{
          labels: weeks.map(x => `Week ${x}`),
          datasets: [
            {
              data: setsData,
              color: () => theme.colors.secondary,
              strokeWidth: moderateScale(3.25),
            },
            {
              data: loggedSetsData,
              color: () => theme.colors.primary,
              strokeWidth: moderateScale(1.75),
            },
          ],
          legend: ['expected', 'actual'],
        }}
        width={scale(280)}
        height={scale(200)}
        yAxisSuffix={isWeightChart === true ? ' kg' : ''}
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          backgroundGradientToOpacity: 0,
          color: () => theme.colors.grey5,
          labelColor: () => theme.colors.black,
          decimalPlaces: 2,
        }}
        style={{
          marginVertical: 8,
          borderRadius: moderateScale(5),
        }}
        fromZero={true}
        withShadow={false}
        hidePointsAtIndex={hidePoints}
      /> :
      <Text>Not enough data</Text>
    }
    </View>
  );
};

export default React.memo(WeeklyChart);
