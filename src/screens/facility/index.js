import { View, Text } from 'react-native'
import React, { Suspense } from 'react'
import { LoadingScreen } from '../../../App';

const Facility = ({navigation, route}) => {
  const facility = route?.params?.facility;
  console.log(facility)
  return (
    <Suspense fallback={LoadingScreen()}>
        <View style={{flex: 1}}>
        <Text style={{color: 'white'}}>{facility?.id}</Text>
        </View>
    </Suspense>
  )
}

export default Facility