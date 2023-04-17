import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import { lightColors, PricingCard } from '@rneui/themed'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const Subscription = ({subscription}) => {
console.log(subscription)
  return (
    <PricingCard
      color={lightColors.primary}
      title={subscription.name}
      price={`$${Number(subscription.price).toFixed(2)}`}
      info={[subscription.details]}
      infoStyle={{maxHeight: verticalScale(100)}}
      button={{containerStyle: {width: 0, height: 0}}}
      containerStyle={{borderRadius: moderateScale(10)}}
    />
  )
}

export default Subscription