import {View, Text, ToastAndroid} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../customButton';
import Resources from '../../Resources';
import Animated, { FadeInUp } from 'react-native-reanimated';

const AddSetComponent = ({setState, setsState}) => {
  const [set, setSet] = setState;
  const [sets, setSets] = setsState

  const numberRegex = new RegExp('^[0-9]+$');

  const AddSet = () => {
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
    <Animated.View
        entering={FadeInUp.delay(500)}
        style={styles.view}>
      <Text style={styles.header}>{`${Resources.Texts.Set} #${(sets?.length ?? 0) + 1}`}</Text>
      <View style={styles.infoView}>
        <View style={styles.subView}>
          <Text style={styles.boldText}>{Resources.Texts.Repetitions}</Text>
          <TextInput
            value={set?.Repetitions?.toString()}
            keyboardType='number-pad'
            onChangeText={val => OnChangeRepetitions(val)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.subView}>
          <Text style={styles.boldText}>{`${Resources.Texts.Weight} (kg)`}</Text>
          <TextInput
            keyboardType='number-pad'
            value={set?.Weights?.toString()}
            onChangeText={val => OnChangeWeights(val)}
            style={styles.textInput}
          />
        </View>
      </View>
      <CustomButton styles={styles} btnText={Resources.ButtonTexts.Add} onPress={AddSet}/>
    </Animated.View>
  );
};

export default AddSetComponent;
