import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';

const TrainingPlanForm = ({data, theme}) => {
  console.log(data)

  const formDetails = JSON.parse(data.formDetails);
  console.log(formDetails)
  return (
    <Animated.View
      style={styles({theme: theme}).view}
      entering={FadeInUp.delay(100)}>
      <Text style={styles({theme: theme}).header}>{formDetails.goal}</Text>
      <View style={styles({theme: theme}).infoView}>
          <Text style={styles({theme: theme}).text}>Created by: {data.username}</Text>
          <Text style={styles({theme: theme}).text}>Details: {formDetails.details}</Text>
          {formDetails.healthIssues !== null ? 
          <Text style={styles({theme: theme}).text}>Health issues: {formDetails.healthIssues}</Text> : null}
      </View>
    </Animated.View>
  );
};

export default TrainingPlanForm;
