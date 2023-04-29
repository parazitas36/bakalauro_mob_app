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
import { useTheme } from '@rneui/themed';

const ExerciseSelectionList = ({exercises, exerciseState}) => {
  const [hidden, setHidden] = useState(false);
  const [exercise, setExercise] = exerciseState;

  const {theme} = useTheme();

  const [query, setQuery] = useState(null);

  const queriedExercises = useMemo(() => {
    if (query === null || query === '') {
      return exercises;
    }

    return exercises.filter(x => String(x.name).toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const ExerciseItem = ({data}) => {
    return (
      <TouchableOpacity
        style={styles({theme: theme}).card}
        onPress={() => {
          setExercise(data);
          setHidden(true);
        }}>
        <Text style={styles({theme: theme}).exerciseHeader}>{data.name}</Text>
        <View style={styles({theme: theme}).infoView}>
          <View
            style={{
              ...styles({theme: theme}).subView,
              paddingLeft: scale(10),
            }}>
            <Text style={styles({theme: theme}).boldText}>{Resources.Texts.MuscleGroups}</Text>
            <Text style={styles({theme: theme}).text}>{data.muscleGroups}</Text>
          </View>
          <View
            style={{
              ...styles({theme: theme}).subView,
              paddingRight: scale(10),
              alignItems: 'flex-end',
            }}>
            <Text style={styles({theme: theme}).boldText}>{Resources.Texts.Equipment}</Text>
            <Text style={styles({theme: theme}).text}>
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
          style={styles({theme: theme}).view}
          entering={FadeInDown.delay(500)}
          exiting={FadeOutDown.delay(200)}>
          <View style={styles({theme: theme}).searchView}>
            <Icon name="search" color={theme.colors.black} size={15} />
            <TextInput
              style={styles({theme: theme}).searchText}
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
              <Text style={{color: theme.colors.black}}>
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
