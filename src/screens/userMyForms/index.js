import React from 'react'
import { Animated } from 'react-native'
import UserForms from '../userForms'
import TrainerTrainingPlanOffers from '../../components/trainerTrainingPlanOffers'
import { FAB, Text, useTheme } from '@rneui/themed'
import Resources from '../../Resources'
import { FadeInLeft } from 'react-native-reanimated'

const UserMyForms = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <Animated.View
        entering={FadeInLeft.delay(200)}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <UserForms />
        <Text h4>Training plan offers</Text>
        <TrainerTrainingPlanOffers />
        <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            color={theme.colors.primary}
            size="small"
            placement="right"
            onPress={() => navigation.navigate('CreateTrainingPlanForm')}
          />
    </Animated.View>
  )
}

export default UserMyForms