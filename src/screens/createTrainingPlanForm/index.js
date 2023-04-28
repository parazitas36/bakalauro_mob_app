import React, {useContext, useState, Suspense} from 'react';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import { TextInput } from 'react-native-gesture-handler';
import { PostExerciseCall } from '../../api/PostExerciseCall';
import { SelectList } from 'react-native-dropdown-select-list';
import { Text } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { PostCall } from '../../api/PostCall';
import { ApiConstants } from '../../api/ApiConstants';

const CreateTrainingPlanForm = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;


  const [goal, setGoal] = useState('');
  const [details, setDetails] = useState(null);
  const [healthIssues, setHealthIssues] = useState(null);

  const goals = [
    {key: '1', value: 'Lose weight'},
    {key: '2', value: 'Gain weight'},
    {key: '3', value: 'Strength training'},
    {key: '4', value: 'Endurance training'},
    {key: '5', value: 'Other'},
  ];

  const SavePress = async() => {
    const body = {
      FormDetails: JSON.stringify({
        goal: goal,
        details, details,
        healthIssues: healthIssues
      })
    }

    const resp = await PostCall({endpoint: ApiConstants().TrainingPlanForms, token: token, body: body})
    console.log(resp)

    if(resp.status === 201) {
      //setGuide([]);
      navigation.goBack();
      //setRefreshExercises(true)
    }
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles.view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>
        Fill the data of what kind of training plan you are looking for
        </Animated.Text>
        <TextInput
          multiline={true}
          numberOfLines={2}
          style={styles.textInput}
          placeholder={Resources.Placeholders.Details} 
          placeholderTextColor={Resources.Colors.PlaceholdersColor} 
          onChangeText={setDetails} 
          value={details} />
        <TextInput
          multiline={true}
          numberOfLines={2}
          style={styles.textInput}
          placeholder={'Health issues (optional)'} 
          placeholderTextColor={Resources.Colors.PlaceholdersColor} 
          onChangeText={setHealthIssues} 
          value={healthIssues} />
        <SelectList
          boxStyles={{marginVertical: verticalScale(5)}}
          inputStyles={{color: 'white', width: scale(200)}}
          placeholder='Select goal'
          search={false}
          dropdownTextStyles={{color: 'white'}}
          setSelected={(val) => {console.log(val); setGoal(val)}}
          data={goals}
          save="value"
        />
        <CustomButton
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={async() => await SavePress()}
          styles={styles}
        />
      </Animated.View>
    </Suspense>
  );
};

export default CreateTrainingPlanForm;
