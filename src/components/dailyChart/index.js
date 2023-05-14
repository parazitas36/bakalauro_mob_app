import {View} from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { moderateScale, scale } from 'react-native-size-matters';

const DailyChart = ({data, isWeightChart, theme}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const setsData = data.map(x =>
    isWeightChart === true ? x.sets.weightAvg : x.sets.repsAvg,
  );
  const loggedSetsData = data.map(x =>
    isWeightChart === true ? x.loggedSets.weightAvg : x.loggedSets.repsAvg,
  );
  const hidePoints = data.map((x, i) => {
      if (x.hide === true) {
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
          labels: days,
          datasets: [
            {
              data: setsData,
              color: () => '#ac64f5',
              strokeWidth: moderateScale(3.25),
              withDots: true,
            },
            {
              data: loggedSetsData,
              color: () => 'rgba(32, 240, 240, 1)',
              strokeWidth: moderateScale(1.75),
              withDots: true,
            },
          ],
          legend: ['expected', 'actual'],
        }}
        width={scale(280)} // from react-native
        height={scale(200)}
        yAxisSuffix={isWeightChart === true ? ' kg' : ''}
        chartConfig={{
          backgroundGradientFrom: theme.colors.primary,
          backgroundGradientTo: theme.colors.secondary,
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 2,
        }}
        withDots={true}
        style={{
          marginVertical: 8,
          borderRadius: moderateScale(5),
        }}
        hidePointsAtIndex={hidePoints}
        withShadow={false}
      />
    </View>
  );
};

export default React.memo(DailyChart);
