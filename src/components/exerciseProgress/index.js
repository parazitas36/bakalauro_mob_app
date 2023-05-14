import { Card } from '@rneui/themed'
import React from 'react'
import Animated from 'react-native-reanimated'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Charts from '../charts'

const ExerciseProgress = ({data, theme}) => {
  const weeks = data.weeks

  return (
    <Animated.View style={{flex: 1, paddingBottom: verticalScale(20)}}>
       <Card containerStyle={{width: scale(320), paddingHorizontal: 0, alignItems: 'center', borderRadius: moderateScale(5)}}>
        <Card.Title h3>{data.exerciseName}</Card.Title>
        <Card.Divider inset={true} insetType='middle'/>
        <Charts weeks={weeks} theme={theme}/>
       </Card>
    </Animated.View>
  )
}

export default ExerciseProgress