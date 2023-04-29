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
import { useTheme } from '@rneui/themed';

const CreateTrainingPlanForm = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

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
      navigation.goBack();
      //setRefreshExercises(true)
    }
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles({theme: theme}).view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles({theme: theme}).heading}>
        Fill the data of what kind of training plan you are looking for
        </Animated.Text>
        <TextInput
          multiline={true}
          numberOfLines={2}
          style={styles({theme: theme}).textInput}
          placeholder={Resources.Placeholders.Details} 
          placeholderTextColor={Resources.Colors.PlaceholdersColor} 
          onChangeText={setDetails} 
          value={details} />
        <TextInput
          multiline={true}
          numberOfLines={2}
          style={styles({theme: theme}).textInput}
          placeholder={'Health issues (optional)'} 
          placeholderTextColor={Resources.Colors.PlaceholdersColor} 
          onChangeText={setHealthIssues} 
          value={healthIssues} />
        <SelectList
          boxStyles={{marginVertical: verticalScale(5)}}
          inputStyles={styles({theme: theme}).selectListInputStyle}
          placeholder='Select goal'
          search={false}
          dropdownTextStyles={styles({theme: theme}).selectListDropdownTextStyle}
          setSelected={(val) => setGoal(val)}
          data={goals}
          save="value"
        />
        <CustomButton
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={async() => await SavePress()}
          styles={styles({theme: theme})}
        />
      </Animated.View>
    </Suspense>
  );
};

export default CreateTrainingPlanForm;
