import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Resources from '../../Resources';
import styles from './styles';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useMemo} from 'react';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

const ExerciseSelectionList = ({exercises, exerciseState}) => {
  const [hidden, setHidden] = useState(false);
  const [exercise, setExercise] = exerciseState;

  const [query, setQuery] = useState(null);

  const queriedExercises = useMemo(() => {
    if (query === null || query === '') {
      return exercises;
    }

    return exercises.filter(x => x.name.includes(query));
  }, [query]);

  const ExerciseItem = ({data}) => {
    // {"createdBy": 4002, "equipment": null, "exerciseType": "Other", "hasGuide": true, "id": 1, "muscleGroups": "all", "name": "test"}
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setExercise(data);
          setHidden(true);
        }}>
        <Text style={styles.exerciseHeader}>{data.name}</Text>
        <View style={styles.infoView}>
          <View
            style={{
              ...styles.subView,
              paddingLeft: scale(10),
            }}>
            <Text style={{color: 'white'}}>{Resources.Texts.MuscleGroups}</Text>
            <Text style={{color: 'white'}}>{data.muscleGroups}</Text>
          </View>
          <View
            style={{
              ...styles.subView,
              paddingRight: scale(10),
              alignItems: 'flex-end',
            }}>
            <Text style={{color: 'white'}}>{Resources.Texts.Equipment}</Text>
            <Text style={{color: 'white'}}>
              {data.equipment === null ? 'No equipment' : data.equipment.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {hidden === true ? null : (
        <Animated.View
          style={styles.view}
          entering={FadeInDown.delay(500)}
          exiting={FadeOutDown.delay(200)}>
          <View style={styles.searchView}>
            <Icon name="search" color="grey" size={15} />
            <TextInput
              style={styles.searchText}
              placeholder={Resources.Texts.Search}
              placeholderTextColor={Resources.Colors.PlaceholdersColor}
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <ScrollView horizontal>
            {queriedExercises?.length > 0 ? (
              queriedExercises?.map((x, i) => {
                return <ExerciseItem key={i} data={x} />;
              })
            ) : (
              <Text style={{color: 'white'}}>
                {Resources.Texts.NoExercises}
              </Text>
            )}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
};

export default ExerciseSelectionList;
