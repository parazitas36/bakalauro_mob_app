import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';

const SetComponent = ({id, setsState, theme}) => {
  const [sets, setSets] = setsState
  const data = sets[id]

  return (
    <Animated.View
      style={styles({theme: theme}).view}
      entering={FadeInUp.delay(100)}>
      <Text style={styles({theme: theme}).header}>{`${Resources.Texts.Set} #${id+1}`}</Text>
      <View style={styles({theme: theme}).infoView}>
        <View style={styles({theme: theme}).subView}>
          <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Repetitions}</Text>
          <Text style={styles({theme: theme}).boldText}>{data?.Repetitions}</Text>
        </View>
        <View style={styles({theme: theme}).subView}>
          <Text style={styles({theme: theme}).boldText}>{`${Resources.Texts.Weight} (kg)`}</Text>
          <Text style={styles({theme: theme}).boldText}>{data?.Weights}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default SetComponent;
