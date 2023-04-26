import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../customButton';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';

const SetComponent = ({id, setsState}) => {
  const [sets, setSets] = setsState
  const data = sets[id]

  return (
    <Animated.View
      style={styles.view}
      entering={FadeInUp.delay(100)}>
      <Text style={styles.header}>{`${Resources.Texts.Set} #${id+1}`}</Text>
      <View style={styles.infoView}>
        <View style={styles.subView}>
          <Text style={styles.boldText}>{Resources.Texts.Repetitions}</Text>
          <Text style={styles.boldText}>{data?.Repetitions}</Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.boldText}>{`${Resources.Texts.Weight} (kg)`}</Text>
          <Text style={styles.boldText}>{data?.Weights}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default SetComponent;
