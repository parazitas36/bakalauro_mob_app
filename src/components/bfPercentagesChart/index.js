import { View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Text, useTheme } from '@rneui/themed'
import { moderateScale, scale } from 'react-native-size-matters'

const BFPercentagesChart = ({bfPercentages, days}) => {
  const {theme} = useTheme();
  const adjustedLabels = days.map((x) => {
    const date = new Date(x);
    const month = date.getMonth()+1;
    const monthString = month < 10 ? `0${month}` : month.toString() 
    const day = date.getDate()
    const dayString = day < 10 ? `0${day}` : day.toString() 
    return `${monthString}/${dayString}`
  })

  const adjustedBfPercentages = bfPercentages?.map(x => Number(x))

  const GetValue = (index) => {
    if (adjustedBfPercentages.length > 7) {
      return adjustedBfPercentages.at(-7+index)
    }
    return adjustedBfPercentages.at(index)
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Text h4 style={{textAlign: 'center', padding: 10}}>Body Fat% Chart</Text>
      <LineChart
        data={{
          labels: adjustedLabels?.length > 7 ? adjustedLabels.slice(-7) : adjustedLabels,
          datasets: [
            {
              data: adjustedBfPercentages?.length > 7 ? adjustedBfPercentages.slice(-7) : adjustedBfPercentages,
              color: () => theme.colors.primary,
              strokeWidth: moderateScale(3.25),
              withDots: true,
            },
          ],
        }}
        width={scale(300)}
        height={scale(200)}
        yAxisSuffix="%"
        chartConfig={{
            backgroundColor: theme.colors.background,
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            backgroundGradientToOpacity: 0,
            color: () => theme.colors.grey5,
            labelColor: () => theme.colors.black,
            decimalPlaces: 1
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
                    <Text style={{fontSize: 10, fontWeight: 'bold'}}>{GetValue(index)}%</Text>
                </View>
            )
        }}
        withShadow={false}
      />
    </View>
  )
}

export default React.memo(BFPercentagesChart)