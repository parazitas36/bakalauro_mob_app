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
      infoStyle={{
        maxHeight: verticalScale(100),
        color: 'rgba(255, 255, 255, 0.75)'
      }}
      button={{containerStyle: {width: 0, height: 0}}}
      containerStyle={{
        borderRadius: moderateScale(10),
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        width: '100%',
        borderWidth: moderateScale(2),
      }}
      pricingStyle={{
        color: 'white'
      }}
    />
  )
}

export default Subscription