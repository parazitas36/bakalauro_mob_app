import { View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Text, useTheme } from '@rneui/themed'
import { moderateScale, scale } from 'react-native-size-matters'

const BMIChart = ({bmis, days}) => {
  const {theme} = useTheme();
  const adjustedLabels = days.map((x) => {
    const splits = x.split('/');
    return `${splits[0]}/${splits[1]}`
  })

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Text h4 style={{textAlign: 'center', padding: 10}}>BMI Chart</Text>
      <LineChart
        data={{
          labels: adjustedLabels.slice(-10),
          datasets: [
            {
              data: bmis.slice(-10),
              color: () => theme.colors.primary,
              strokeWidth: moderateScale(3.25),
              withDots: true,
            },
          ],
        }}
        width={scale(300)} // from react-native
        height={scale(200)}
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
          marginVertical: 10,
          borderRadius: moderateScale(5),
        }}
        renderDotContent={({x, y, index}) => {
            return (
                <View key={index} style={{
                    width: scale(25), 
                    height: scale(25), 
                    position:'absolute',
                    top: y - scale(22),
                    left: x - scale(12),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 10, fontWeight: 'bold'}}>{bmis[index]}</Text>
                </View>
            )
        }}
        withShadow={false}
      />
    </View>
  )
}

export default React.memo(BMIChart)