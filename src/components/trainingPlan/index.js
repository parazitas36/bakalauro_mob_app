import React from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';

import styles from './styles';
import {View} from 'react-native';
import Resources from '../../Resources';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Card, Divider, Text } from '@rneui/themed';
import MuscleIcon from '../muscleIcon';
import { verticalScale } from 'react-native-size-matters';

const TrainingPlan = ({navigation, clientId = null, trainingPlan, theme, selectView = false, setSelectedTrainingPlan}) => {
  const muscleGroups = []

  trainingPlan?.muscleGroups.forEach(arr => {
    const groups = JSON.parse(arr);

    groups.forEach(x => {
      if(!muscleGroups.includes(x)) {
        muscleGroups.push(x)
      }
    })
  })

  const usedEquipment = () => {
    const arr = []
    if(trainingPlan.equipment?.length > 0) {
      trainingPlan.equipment.forEach(x => { 
        if(!arr.includes(y => y.name === x.name)){
          arr.push(x)
        }
      })
    }
    return arr
  }

  if (selectView === true) {
    return (
      <Animated.View entering={FadeInLeft.delay(200)}>
        <TouchableOpacity 
          onPress={() => {
            setSelectedTrainingPlan(trainingPlan)
          }}>
          <Card containerStyle={styles({theme: theme}).card}>
            <Card.Title h4>{trainingPlan?.name}</Card.Title>
            <Card.Divider />
            <View style={styles({theme: theme}).infoView}>
              <View style={styles({theme: theme}).subView}>
                <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 2, padding: 2}}>
                  {muscleGroups.length > 0 ? muscleGroups.map((x, i) => {
                    return <MuscleIcon muscleName={x} key={i} size={30} />
                  })
                  : null}
                </View>
              </View>
              <Divider orientation='vertical'/>
              <View style={{...styles({theme: theme}).subView, alignItems: 'flex-end'}}>
                <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
                {trainingPlan.equipment?.length > 0 ? 
                  usedEquipment().map((x, i) => {
                    return <Text key={i} style={styles({theme: theme}).text}>{x.name}</Text>;
                  }) : 
                  <Text style={styles({theme: theme}).text}>
                    {`${Resources.Texts.NoEquipment}`}
                  </Text>
                }
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <Animated.View entering={FadeInLeft.delay(200)}>
      <TouchableOpacity 
        onPress={() => 
          navigation.navigate({
            name: Resources.Screens.TrainingPlanScreen, 
            params: { trainingPlanId: trainingPlan.id, clientId: clientId, assignedTo: trainingPlan.assignedTo }
          })}>
        <Card containerStyle={styles({theme: theme}).card}>
          <Card.Title h4>{trainingPlan?.name}</Card.Title>
          <Card.Divider 
            subHeader={trainingPlan.assignedTo !== null ? `Assigned to: ${trainingPlan.assignedTo}` : null}
            subHeaderStyle={trainingPlan.assignedTo !== null ? {textAlign: 'center', marginBottom: verticalScale(5), color: theme.colors.black} : null}/>
          <View style={styles({theme: theme}).infoView}>
            <View style={styles({theme: theme}).subView}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 2, padding: 2}}>
                {muscleGroups.length > 0 ? muscleGroups.map((x, i) => {
                  return <MuscleIcon muscleName={x} key={i} size={30} />
                })
                : null}
              </View>
            </View>
            <Divider orientation='vertical'/>
            <View style={{...styles({theme: theme}).subView, alignItems: 'flex-end'}}>
              <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
              {trainingPlan.equipment?.length > 0 ? 
                usedEquipment().map((x, i) => {
                  return <Text key={i} style={styles({theme: theme}).text}>{x.name}</Text>;
                }) : 
                <Text style={styles({theme: theme}).text}>
                  {`${Resources.Texts.NoEquipment}`}
                </Text>
              }
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  )
};

export default React.memo(TrainingPlan);
