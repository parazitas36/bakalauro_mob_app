import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Card, Divider, Text } from '@rneui/themed';

const SetComponent = ({id, setsState, theme}) => {
  const [sets, setSets] = setsState
  const data = sets[id]

  return (
    <Animated.View entering={FadeInUp.delay(100)}>
      <Card containerStyle={styles({theme: theme}).view}>
        <Card.Title h4>{`${Resources.Texts.Set} #${id+1}`}</Card.Title>
        <Card.Divider />
        <View style={styles({theme: theme}).infoView}>
          <View style={styles({theme: theme}).subView}>
            <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Repetitions}</Text>
            <Text style={styles({theme: theme}).boldText}>{data?.Repetitions}</Text>
          </View>
          <Divider orientation='vertical' />
          <View style={styles({theme: theme}).subView}>
            <Text style={styles({theme: theme}).boldText}>{`${Resources.Texts.Weight} (kg)`}</Text>
            <Text style={styles({theme: theme}).boldText}>{data?.Weights}</Text>
          </View>
      </View>
      </Card>
    </Animated.View>
  )
};

export default SetComponent;
