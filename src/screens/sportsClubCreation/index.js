import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated'
import styles from './styles'

const SportsClubCreation = () => {
  return (
    <Animated.View style={styles.view} entering={FadeInLeft} exiting={FadeOutRight}>
        <Text style={styles.heading}>Fill your sports club information</Text>
    </Animated.View>
  )
}

export default SportsClubCreation