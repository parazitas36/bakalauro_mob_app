import React from 'react'
import styles from './styles'
import { lightColors, PricingCard } from '@rneui/themed'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const Subscription = ({subscription, theme}) => {
console.log(subscription)
  return (
    <PricingCard
      color={theme.mode === 'dark' ? theme.colors.secondary : theme.colors.primary}
      title={subscription.name}
      price={`$${Number(subscription.price).toFixed(2)}`}
      info={[subscription.details]}
      infoStyle={{
        maxHeight: verticalScale(100),
        color: theme.colors.grey0
      }}
      button={{containerStyle: {width: 0, height: 0}}}
      containerStyle={{
        borderRadius: moderateScale(10),
        backgroundColor: theme.colors.background,
        width: '100%',
        borderWidth: moderateScale(2),
      }}
      pricingStyle={{
        color: theme.colors.black
      }}
    />
  )
}

export default Subscription