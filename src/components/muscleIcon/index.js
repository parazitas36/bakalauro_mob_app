import {View, Text} from 'react-native';
import React, {Suspense} from 'react';
import {Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {LoadingScreen} from '../../../App';
import {TouchableOpacity} from 'react-native';

const MuscleIcon = ({muscleName, muscleGroups, setMuscleGroups, editMode, theme, size = 35}) => {
  const muscleImages = {
    abs: require('../../assets/images/abs.png'),
    biceps: require('../../assets/images/biceps.png'),
    calves: require('../../assets/images/calves.png'),
    chest: require('../../assets/images/chest.png'),
    glutes: require('../../assets/images/glutes.png'),
    hamstrings: require('../../assets/images/hamstrings.png'),
    lowerback: require('../../assets/images/lowerback.png'),
    quadriceps: require('../../assets/images/quadriceps.png'),
    shoulders: require('../../assets/images/shoulders.png'),
    triceps: require('../../assets/images/triceps.png'),
    upperback: require('../../assets/images/upperback.png'),
  };

  if (editMode === true) {
    const isInTheList = muscleGroups?.filter(x => x === muscleName).length > 0;
    const onPress = () => {
        if (isInTheList === true) {
            setMuscleGroups(muscleGroups?.filter(x => x !== muscleName))
        } else {
            setMuscleGroups(prev => [...prev, muscleName])
        }
    }


    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          height: scale(size),
          width: scale(size),
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: scale(1),
          borderColor: isInTheList ? theme.colors.primary : theme.colors.background,
          padding: scale(1),
          borderRadius: 90
        }}>
        <Image
          source={muscleImages[muscleName]}
          style={{
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        height: scale(size),
        width: scale(size),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={muscleImages[muscleName]}
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default MuscleIcon;
