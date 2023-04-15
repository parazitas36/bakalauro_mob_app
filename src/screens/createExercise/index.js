import React, {useContext, useState, Suspense} from 'react';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import { TextInput } from 'react-native-gesture-handler';

const CreateExercise = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [muscleGroups, setMuscleGroups] = useState('arms');
  const [name, setName] = useState(null);
  const [exerciseType] = useState('Other');
  const [equipmentId, setEquipmentId] = useState(null);
  const [guide, setGuide] = useState(null);

  const SavePress = () => {
    const body = {
      "name": "string",
      "muscleGroups": "arms",
      "exerciseTypes": "string",
      "equipmentId": null,
      "guide": "string"
    }
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles.view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>
        CreateExercise
        </Animated.Text>
        <TextInput placeholder='Name' placeholderTextColor={'grey'} onChangeText={setName} value={name} />
        <CustomButton btnText={'Add guide'} onPress={async() => navigation.navigate('CreateExerciseGuide')} styles={styles}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateExercise;
