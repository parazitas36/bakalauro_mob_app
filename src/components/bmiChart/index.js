import { View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Text, useTheme } from '@rneui/themed'
import { moderateScale, scale } from 'react-native-size-matters'

const BMIChart = ({bmis, days}) => {
  const {theme} = useTheme();
  const adjustedLabels = days.map((x) => {
    const date = new Date(x);
    const month = date.getMonth()+1;
    const monthString = month < 10 ? `0${month}` : month.toString() 
    const day = date.getDate()
    const dayString = day < 10 ? `0${day}` : day.toString() 
    return `${monthString}/${dayString}`
  })

  const adjustedBbmis = bmis?.map(x => Number(x))

  const dotColor = (val) => {
    if (Number(val) < 18.5) {
      return theme.colors.primary
    } else if (Number(val) >= 18.5 && Number(val) <= 24.9) {
      return theme.colors.success
    } else if (Number(val) >= 25 && Number(val) <= 29.9) {
      return theme.colors.warning
    }
    return theme.colors.error
  }

  const GetValue = (index) => {
    if (adjustedBbmis?.length > 7) {
      return adjustedBbmis.at(-7+index)
    }
    return adjustedBbmis.at(index)
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Text h4 style={{textAlign: 'center', padding: 10}}>BMI Chart</Text>
      <View style={{flexDirection: 'row', width: scale(280), alignSelf: 'center', gap: scale(5)}}>
        <View style={{flex: 1, paddingVertical: scale(5), alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: moderateScale(5)}}>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>Underweight</Text>
          </View>
          <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>{`< 18.5`}</Text>
        </View>
        <View style={{flex: 1, paddingVertical: scale(5), height: scale(50), alignItems: 'center', backgroundColor: theme.colors.success, borderRadius: moderateScale(5)}}>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>Normal</Text>
          </View>
          <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>{`18.5 - 24.9`}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', width: scale(280), alignSelf: 'center', marginVertical: scale(5), gap: scale(5)}}>
        <View style={{flex: 1, paddingVertical: scale(5), height: scale(50), alignItems: 'center', backgroundColor: theme.colors.warning, borderRadius: moderateScale(5)}}>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>Overweight</Text>
          </View>
          <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>{`25 - 29.9`}</Text>
        </View>
        <View style={{flex: 1, paddingVertical: scale(5), height: scale(50), alignItems: 'center', backgroundColor: theme.colors.error, borderRadius: moderateScale(5)}}>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>Obese</Text>
          </View>
          <Text style={{textAlign: 'center', fontSize: scale(14), fontWeight: 'bold', color: theme.colors.white}}>{`30+`}</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: adjustedLabels.length > 7 ? adjustedLabels.slice(-7) : adjustedLabels,
          datasets: [
            {
              data: adjustedBbmis.length > 7 ? adjustedBbmis.slice(-7) : adjustedBbmis,
              color: () => theme.colors.primary,
              strokeWidth: moderateScale(3.25),
              withDots: true,
            },
          ],
        }}
        width={scale(300)}
        height={scale(200)}
        yAxisSuffix=" "
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          backgroundGradientToOpacity: 0,
          color: () => theme.mode === 'dark' ? theme.colors.grey5 : 'rgba(0, 0, 0, 0.5)',
          labelColor: () => theme.colors.black,
          decimalPlaces: 0,
        }}
        withDots={true}
        style={{
          marginVertical: 10,
          borderRadius: moderateScale(5),
        }}
        renderDotContent={({x, y, index}) => {
            return (
                <View key={index} style={{
                    width: scale(23), 
                    height: scale(23), 
                    position:'absolute',
                    top: y - scale(16),
                    left: x - scale(12),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: dotColor(GetValue(index)),
                    borderRadius: 90
                }}>
                    <Text style={{fontSize: 10, fontWeight: 'bold', color: 'white'}}>{GetValue(index)?.toFixed(1)}</Text>
                </View>
            )
        }}
        withShadow={false}
      />
    </View>
  )
}

export default React.memo(BMIChart)