import {View} from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import { LineChart } from 'react-native-chart-kit';

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
      <LineChart
        data={{
          labels: weeks.map(x => `Week ${x}`),
          datasets: [
            {
              data: setsData,
              color: () => '#ac64f5',
              strokeWidth: moderateScale(3.25),
            },
            {
              data: loggedSetsData,
              color: () => 'rgba(32, 240, 240, 1)',
              strokeWidth: moderateScale(1.75),
            },
          ],
          legend: ['expected', 'actual'],
        }}
        width={scale(280)}
        height={scale(200)}
        yAxisSuffix={isWeightChart === true ? ' kg' : ''}
        chartConfig={{
          backgroundGradientFrom: theme.colors.primary,
          backgroundGradientTo: theme.colors.secondary,
          backgroundGradientToOpacity: 0.25,
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 2,
        }}
        style={{
          marginVertical: 8,
          borderRadius: moderateScale(5),
        }}
        withShadow={false}
        hidePointsAtIndex={hidePoints}
      />
    </View>
  );
};

export default React.memo(WeeklyChart);
