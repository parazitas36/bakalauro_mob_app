import {View, ToastAndroid} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Button, Card, Icon, Text, useTheme } from '@rneui/themed';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const AddSetComponent = ({setState, setsState}) => {
  const [set, setSet] = setState;
  const [sets, setSets] = setsState

  const {theme} = useTheme();

  const numberRegex = new RegExp('^[0-9]+$');

  const AddSet = () => {styles({theme: theme}).textInput
    if (set?.Repetitions > 0) {
      setSets(prev => [...prev, set]);
    } else {
      ToastAndroid.show(
        'Repetitions cannot be zero!',
        ToastAndroid.SHORT
      )
    }
  };

  const OnChangeRepetitions = value => {
    if (numberRegex.test(String(value)) === false && String(value).length > (set?.Weights?.length ?? 0)) {
      return;
    }

    if (set === null) {
      setSet({Repetitions: value.toString(), Weights: '0'});
      return;
    }

    setSet({...set, Repetitions: value.toString()});
  };

  const OnChangeWeights = value => {
    if (numberRegex.test(String(value)) === false && String(value).length > (set?.Weights?.length ?? 0)) {
      return;
    }

    if (set === null) {
      setSet({Weights: value.toString(), Repetitions: '0'});
      return;
    }

    setSet({...set, Weights: value.toString()});
  };

  return (
    <Animated.View entering={FadeInUp.delay(500)}>
      <Card containerStyle={styles({theme: theme}).view}>
        <Card.Title h4>{`${Resources.Texts.Set} #${(sets?.length ?? 0) + 1}`}</Card.Title>
        <Card.Divider />
        <View style={styles({theme: theme}).infoView}>
        <View style={styles({theme: theme}).subView}>
          <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Repetitions}</Text>
          <TextInput
            value={set?.Repetitions?.toString()}
            keyboardType='number-pad'
            onChangeText={val => OnChangeRepetitions(val)}
            style={styles({theme: theme}).textInput}
          />
        </View>
        <View style={styles({theme: theme}).subView}>
          <Text style={styles({theme: theme}).boldText}>{`${Resources.Texts.Weight} (kg)`}</Text>
          <TextInput
            keyboardType='number-pad'
            value={set?.Weights?.toString()}
            onChangeText={val => OnChangeWeights(val)}
            style={styles({theme: theme}).textInput}
          />
        </View>
      </View>
      <Button
        icon={
          <Icon
            name='add' 
            color={theme.colors.black} 
            size={verticalScale(24)} />
        }
        buttonStyle={{
          borderRadius: moderateScale(5),
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.black,
          borderWidth: moderateScale(1.25),
          marginTop: verticalScale(10),
          width: scale(100),
          height: verticalScale(40),
          alignSelf: 'center'
        }}
        titleStyle={{
          color: theme.colors.white,
          display: 'none'
        }}
        onPress={AddSet}
      />
      </Card>
    </Animated.View>
  )
};

export default AddSetComponent;
