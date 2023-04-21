import {View, Text} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import {useContext} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import Resources from '../../Resources';
import {RadioGroup} from 'react-native-radio-buttons-group';
import TrainingPlanExercisesInfo from '../../components/trainingPlanExercisesInfo';
import {ScrollView} from 'react-native';
import {createContext} from 'react';
import {useEffect} from 'react';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import TrainingPlanWeeklyExercises from '../../components/trainingPlanWeeklyExercises';

export const TrainingPlanContext = createContext();

const CreateTrainingPlan = ({navigation}) => {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '0',
      label: Resources.Texts.TrainingPlanTypeWeekly,
      value: Resources.Texts.TrainingPlanTypeWeekly,
      labelStyle: styles.radioButtons,
    },
    {
      id: '1',
      label: Resources.Texts.TrainingPlanTypeScheduled,
      value: Resources.Texts.TrainingPlanTypeScheduled,
      labelStyle: styles.radioButtons,
    },
  ]);

  const onPressRadioButton = radioButtonsArray => {
    if (
      radioButtons?.find(x => x.selected === true)?.value ===
      Resources.Texts.TrainingPlanTypeWeekly
    ) {
      setWeek(1);

      setWeeks([{
        Weeks: 1,
        Days: {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        },
      }]);
    }

    setTrainingPlanType(radioButtons?.find(x => x.selected === true)?.value);
    setRadioButtons(radioButtonsArray);
  };

  const { tokenState, userDataState, roleSpecificDataState } = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const { guideState, keyState, weeksState, exercisesState } = useContext(TrainerContext);

  const [exercises, setExercises] = exercisesState;

  const [trainingPlanName, setTrainingPlanName] = useState(null);
  const [trainingPlanType, setTrainingPlanType] = useState(null);
  const [week, setWeek] = useState(1);
  const [key, setKey] = keyState;
  const [weeks, setWeeks] = weeksState;

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [userData.id]}).TrainersExercises,
        token: token,
      });
      console.log(resp)
      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data)
        setExercises(data);
      } else {
        setExercises([]);
      }
    })();
  }, []);

  const contextData = {
    weekState: [week, setWeek],
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <TrainingPlanContext.Provider value={contextData}>
        {exercises === null ? (
          <LoadingScreen />
        ) : (
          <ScrollView
            style={styles.view}
            contentContainerStyle={styles.viewContent}>
            <Text style={styles.heading}>Create plan</Text>
            <TextInput
              value={trainingPlanName}
              onChangeText={setTrainingPlanName}
              placeholder={Resources.Placeholders.TrainingPlanName}
              placeholderTextColor={Resources.Colors.PlaceholdersColor}
              style={styles.textInput}
            />
            <Text style={styles.heading}>{Resources.Texts.Type}</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="row"
            />
            <TrainingPlanExercisesInfo />
            {weeks?.map((x, i) => {
              return <TrainingPlanWeeklyExercises key={i} planWeek={x.Weeks} navigation={navigation} />
            })}
          </ScrollView>
        )}
      </TrainingPlanContext.Provider>
    </Suspense>
  );
};

export default CreateTrainingPlan;