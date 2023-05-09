import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { Button, Card, Divider, ListItem, Text } from '@rneui/themed';
import { scale } from 'react-native-size-matters';

const LoggedSetComponent = ({id, trainingPlanExerciseId, loggedSets, setLoggedSets, theme, data, index}) => {
  console.log(loggedSets.filter(x => x.trainingPlanExerciseId === trainingPlanExerciseId)?.at(0)?.loggedSets[index])
  const DeleteSet = () => {
    const updatedExerciseSets = loggedSets.filter(x => x.trainingPlanExerciseId === trainingPlanExerciseId)?.at(0)?.loggedSets
      .filter((x, i) => { if(i != index){return x}});

    const newLoggedSets = loggedSets.map(x => {
      if (x.trainingPlanExerciseId === trainingPlanExerciseId) {
        return { trainingPlanExerciseId: x.trainingPlanExerciseId, loggedSets: updatedExerciseSets}
      } else { return x }
    });
    setLoggedSets(newLoggedSets)
  }

  return (
    <Animated.View entering={FadeInUp.delay(100)}>
      <ListItem.Swipeable
          leftWidth={scale(0)}
          rightWidth={scale(50)}
          minSlideWidth={scale(50)}
          rightContent={() => (
            <Animated.View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              entering={FadeInLeft.delay(600)}>
              <Button
                containerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                type="clear"
                icon={{ name: 'delete-outline' }}
                onPress={() => DeleteSet()}
              />
            </Animated.View>
          )}>
        <Card containerStyle={styles({theme: theme}).view}>
          <Card.Title h4>{`${Resources.Texts.Set} #${id}`}</Card.Title>
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

export default LoggedSetComponent;
