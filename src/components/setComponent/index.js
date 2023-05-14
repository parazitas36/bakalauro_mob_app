import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { Button, Card, Divider, ListItem, Text } from '@rneui/themed';
import { scale } from 'react-native-size-matters';

const SetComponent = ({id, setsState, theme}) => {
  const [sets, setSets] = setsState
  const data = sets[id]

  const DeleteSet = () => {
    let copySets = [...sets]
    setSets(copySets.filter((x, i) => {
      if(i !== id) {
        return x
      }
    }))
  }

  return (
    <Animated.View entering={FadeInUp.delay(100)}>
      <ListItem.Swipeable
        leftWidth={0}
        rightWidth={scale(50)}
        minSlideWidth={scale(10)}
        rightContent={() => (
          <Animated.View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            entering={FadeInLeft.delay(600)}>
            <Button
              containerStyle={{
                justifyContent: 'center',
              }}
              type="clear"
              icon={{name: 'delete-outline', color: theme.colors.error}}
              onPress={() => DeleteSet()}
            />
          </Animated.View>
        )}
      >
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
      </ListItem.Swipeable>
    </Animated.View>
  )
};

export default SetComponent;
