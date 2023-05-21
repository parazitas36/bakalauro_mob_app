import {View} from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '@rneui/themed';

const DailyChart = ({data, isWeightChart, theme}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const setsData = data.map(x =>
    isWeightChart === true ? x.sets.weightAvg : x.sets.repsAvg,
  );
  const loggedSetsData = data.map(x =>
    isWeightChart === true ? x.loggedSets.weightAvg : x.loggedSets.repsAvg,
  );

  const lengthOfLoggedData = loggedSetsData?.filter(x => x !== null).length;

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
      {lengthOfLoggedData > 0 ?
        <LineChart
          data={{
            labels: days,
            datasets: [
              {
                data: setsData,
                color: () => theme.colors.secondary,
                strokeWidth: moderateScale(3.25),
                withDots: true,
              },
              {
                data: loggedSetsData,
                color: () => theme.colors.primary,
                strokeWidth: moderateScale(1.75),
                withDots: true,
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
          withDots={true}
          style={{
            marginVertical: 8,
            borderRadius: moderateScale(5),
          }}
          hidePointsAtIndex={hidePoints}
          withShadow={false}
        /> 
        : <Text>Not enough data</Text>}
    </View>
  );
};

export default React.memo(DailyChart);
