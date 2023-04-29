import React, {useContext, useState, Suspense} from 'react';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import { TextInput } from 'react-native-gesture-handler';
import { PostExerciseCall } from '../../api/PostExerciseCall';
import { useTheme } from '@rneui/themed';

const CreateExercise = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const { guideState, refreshExercisesState } = useContext(TrainerContext)
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [muscleGroups, setMuscleGroups] = useState(null);
  const [name, setName] = useState(null);
  const [exerciseType] = useState('Other');
  const [equipmentId, setEquipmentId] = useState(null);
  const [guide, setGuide] = guideState
  const [refreshExercises, setRefreshExercises] = refreshExercisesState

  const {theme} = useTheme()

  const SavePress = async() => {
    const body = {
      name: name,
      muscleGroups: muscleGroups,
      exerciseTypes: "Other",
      equipmentId: null,
    }

    const resp = await PostExerciseCall({blocks: guide, token: token, body: body})
    console.log(resp)
    if(resp.status === 201) {
      setGuide([]);
      navigation.goBack();
      setRefreshExercises(true)
    }
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles({theme: theme}).view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles({theme: theme}).heading}>
        {Resources.Texts.AddExercise}
        </Animated.Text>
        <TextInput
          style={styles({theme: theme}).textInput}
          placeholder={Resources.Placeholders.Name} 
          placeholderTextColor={Resources.Colors.PlaceholdersColor} 
          onChangeText={setName} value={name} />
        <TextInput
          style={styles({theme: theme}).textInput}
          placeholder={'Muscle group'} 
          placeholderTextColor={Resources.Colors.PlaceholdersColor} 
          onChangeText={setMuscleGroups} value={muscleGroups} />
        <CustomButton 
          btnText={guide.length == 0 ? Resources.ButtonTexts.AddGuide : Resources.ButtonTexts.EditGuide} 
          onPress={() => navigation.navigate(Resources.Screens.CreateExerciseGuide)} 
          styles={styles({theme: theme})}/>
        <CustomButton 
          btnText={Resources.ButtonTexts.SaveBtnText} 
          onPress={async() => await SavePress()} 
          styles={styles({theme: theme})}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateExercise;
