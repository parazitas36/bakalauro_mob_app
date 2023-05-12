import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { moderateScale, scale } from 'react-native-size-matters';
import UserTrainingPlanExerciseWithSets from '../userTrainingPlanExerciseWithSets';
import { Button } from '@rneui/themed';
import { UserContext } from '../../../App';

const UserTrainingPlanExercises = ({navigation, planDay, planWeek, fetchedWeeklyPlan, theme}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const ExerciseData = useMemo(() => {
    if (fetchedWeeklyPlan.length > 0) {
      const data = fetchedWeeklyPlan.filter(x => x.week === planWeek).at(0).days[String(planDay).toLowerCase()]
      return data;
    }
    return []
  }, [fetchedWeeklyPlan])

  const [hidden, setHidden] = useState(ExerciseData.length > 0  ? false : true);
  
  const CountOfCompletedSets = () => ExerciseData?.map(x => {
    if (x?.loggedSets && x?.loggedSets !== null) {
      const sets = JSON.parse(x?.loggedSets)
      if (sets && sets.length > 0) {
        return sets.length
      }
    }
  }).filter(x => {if(x){return x}}).reduce((sum, x) => sum + x, 0)

  const CountOfAssignedSets = () => ExerciseData?.map(x => {
    if (x?.sets && x?.sets !== null) {
      const sets = JSON.parse(x.sets)
      if (sets.length > 0) {
        return sets.length
      }
    }
  }).filter(x => {if(x){return x}}).reduce((sum, x) => sum + x, 0)

  return (
    <View style={styles({theme}).view}>
        <TouchableOpacity style={styles({theme}).dayTextView} onPress={() => setHidden(prev => !prev)}>
          <View style={{width: '50%', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={{
              ...styles({theme}).dayText, 
              color: CountOfAssignedSets() !== 0 && CountOfCompletedSets() === CountOfAssignedSets() ? theme.colors.success :
               CountOfCompletedSets() > 0 ? theme.colors.warning : theme.colors.black}}>
              {planDay}
            </Text>
            {ExerciseData.length === 0 &&
              <Icon 
                name={'bed'} 
                color={theme.colors.black} 
                size={scale(15)}/>}
          </View>
          <View style={styles({theme}).icon}>
            <Icon 
              name={`${hidden ? 'chevron-down' : 'chevron-up'}`} 
              color={theme.colors.black} 
              size={scale(18)} />
          </View>
        </TouchableOpacity>
        <View style={hidden ? styles({theme}).hidden : null}>
          {ExerciseData !== null ? 
            ExerciseData.length > 0 ? ExerciseData.map((x, i) => {
              return <UserTrainingPlanExerciseWithSets
                        key={i}
                        data={x} 
                        exercise={null}
                        theme={theme}
                        userData={userData}
                     />
            }) : <Text style={styles({theme}).text}>Rest day</Text>
          : null}
          {ExerciseData !== null && ExerciseData.length && userData.role === 'User' ?
          <Button
            title={`${CountOfCompletedSets() === CountOfAssignedSets() ? 'Edit' 
              : CountOfCompletedSets() > 0 ? 'Resume' : 'Start'} ${planDay.toLowerCase()} workout`}
            buttonStyle={{width: scale(280), borderRadius: moderateScale(5), alignSelf: 'center'}}
            icon={{name: `${CountOfCompletedSets() === CountOfAssignedSets() ? 'edit' : 'play'}`, type: 'font-awesome', color: 'white'}}
            onPress={() => {
              navigation.navigate({
                name: 'WorkoutScreen',
                params: {
                  dayTrainingPlan: ExerciseData
                }
              })
            }}
          /> : null}
        </View>
      </View>
  )
  
};

export default UserTrainingPlanExercises;
