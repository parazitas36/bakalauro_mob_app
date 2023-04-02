import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'

const Subscription = ({subscription}) => {
console.log(subscription)
  return (
    <View style={styles.card}>
        <View style={styles.titleView}>
            <Text style={styles.titleText}>{subscription.name}</Text>
        </View>
        <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsView}>
            <Text style={styles.detailsText}>{subscription.details}</Text>
        </ScrollView>
        <View style={styles.priceView}>
            <Text style={styles.priceText}>{Number(subscription.price).toFixed(2)}$</Text>
        </View>
    </View>
  )
}

export default Subscription