import React, {useContext, useState, Suspense} from 'react';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import { TextInput } from 'react-native-gesture-handler';
import { PostExerciseCall } from '../../api/PostExerciseCall';

const CreateExercise = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const { guideState, refreshExercisesState } = useContext(TrainerContext)
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [muscleGroups, setMuscleGroups] = useState('arms');
  const [name, setName] = useState(null);
  const [exerciseType] = useState('Other');
  const [equipmentId, setEquipmentId] = useState(null);
  const [guide, setGuide] = guideState
  const [refreshExercises, setRefreshExercises] = refreshExercisesState

  const SavePress = async() => {
    const body = {
      name: name,
      muscleGroups: "arms",
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
      <Animated.View style={styles.view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>
        CreateExercise
        </Animated.Text>
        <TextInput placeholder='Name' placeholderTextColor={'grey'} onChangeText={setName} value={name} />
        <CustomButton btnText={guide.length == 0 ? 'Add guide' : 'Edit guide'} onPress={() => navigation.navigate('CreateExerciseGuide')} styles={styles}/>
        <CustomButton btnText={'Save'} onPress={async() => await SavePress()} styles={styles}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateExercise;
