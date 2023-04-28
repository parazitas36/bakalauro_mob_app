import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../customButton';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';

const TrainingPlanForm = ({data}) => {
  console.log(data)

  const formDetails = JSON.parse(data.formDetails);
  console.log(formDetails)
  return (
    <Animated.View
      style={styles.view}
      entering={FadeInUp.delay(100)}>
      <Text style={styles.header}>{formDetails.goal}</Text>
      <View style={styles.infoView}>
          <Text style={styles.btnText}>Created by: {data.username}</Text>
          <Text style={styles.btnText}>Details: {formDetails.details}</Text>
          {formDetails.healthIssues !== null ? 
          <Text style={styles.btnText}>Health issues: {formDetails.healthIssues}</Text> : null}
      </View>
    </Animated.View>
  );
};

export default TrainingPlanForm;
