import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeInLeft, FadeOutUp} from 'react-native-reanimated';
import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {Text} from 'react-native';
import {FlatList} from 'react-native';
import {FAB} from '@rneui/base';
import TrainingPlan from '../../components/trainingPlan';
import { Button, ListItem, useTheme } from '@rneui/themed';
import { scale } from 'react-native-size-matters';
import DialogInput from 'react-native-dialog-input';
import { PostCall } from '../../api/PostCall';
import { RefreshControl } from 'react-native';
import { DeleteCall } from '../../api/DeleteCall';
import { ToastAndroid } from 'react-native';

const TrainingPlans = ({navigation, selectView = false, setSelectedTrainingPlan}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const {refreshTrainingPlansState, weeksState, exercisesState} = useContext(TrainerContext);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = refreshTrainingPlansState;
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [weeks, setWeeks] = weeksState;
  const [copyTrainingPlanId, setCopyTrainingPlanId] = useState(null);

  const {theme} = useTheme();

  const [trainingPlans, setTrainingPlans] = useState(null);
  const [exercises, setExercises] = exercisesState;

  const CopyTrainingPlan = async(name) => {
    const resp = await PostCall({
      endpoint: ApiConstants({ids: [copyTrainingPlanId]}).CopyTrainingPlan, 
      token: token, 
      body: name
    });
    console.log(resp)
    setRefreshTrainingPlans(true)
  }

  const SubmitInput = async(input) => {
    await CopyTrainingPlan(input);
    setCopyTrainingPlanId(null)
  }

  const DeleteTrainerPlan = async(trainingPlanId) => {
    const resp = await DeleteCall({
      endpoint: ApiConstants({ids: [trainingPlanId]}).DeleteTrainerTrainingPlan,
      token: token
    });

    if (resp.status === 204) {
      ToastAndroid.show(
        'Training plan was deleted successfully!',
        ToastAndroid.SHORT
      )
    } else {
      ToastAndroid.show(
        'Training plan was not deleted!',
        ToastAndroid.SHORT
      )
    }
    setRefreshTrainingPlans(true)
  }

  useEffect(() => {
    if(exercises === null) {
      (async () => {
        const resp = await GetCall({
          endpoint: ApiConstants({ids: [userData.id]}).TrainersExercises,
          token: token,
        });
  
        if (resp.status === 200) {
          const data = await resp.json();
          setExercises(data);
        } else {
          setExercises([]);
        }
      })();
    }

    (async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants({ids: [userData.id]}).TrainingPlansShort}`,
        token: token,
      });


      if (resp.status === 200) {
        const data = await resp.json();

        if (selectView === true) {
          const filteredData = data.filter(x => x.assignedTo === null);
          setTrainingPlans(filteredData)
        } else {
          setTrainingPlans(data);
        }
      } else {
        setTrainingPlans([]);
      }
    })();

    setRefreshTrainingPlans(false);
  }, [refreshTrainingPlans === true]);

  if (selectView === true) {
    return (
      <Suspense fallback={LoadingScreen()}>
        {trainingPlans === null ? <LoadingScreen />
        : (
          <Animated.View
            style={styles({theme}).view}
            entering={FadeInDown.delay(100)}
            exiting={FadeOutUp}>
            <Animated.Text style={styles({theme}).heading}>
              {Resources.Texts.TrainingPlans}
            </Animated.Text>
            {trainingPlans.length === 0 ? 
              <Text style={styles({theme}).text}>{Resources.Texts.NoTrainingPlans}</Text>
            : <FlatList
                data={trainingPlans}
                renderItem={({item, index}) => {
                  return (
                    <TrainingPlan
                      key={index}
                      trainingPlan={item}
                      navigation={navigation}
                      theme={theme}
                      setSelectedTrainingPlan={setSelectedTrainingPlan}
                      selectView={true}
                    />
                  );
                }}
              />
            }
          </Animated.View>
        )}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      {trainingPlans === null ? (
        <LoadingScreen />
      ) : (
        <Animated.View
          style={styles({theme}).view}
          entering={FadeInDown.delay(100)}
          exiting={FadeOutUp}>
          <Animated.Text style={styles({theme}).heading}>
            {Resources.Texts.TrainingPlans}
          </Animated.Text>
          <DialogInput isDialogVisible={copyTrainingPlanId !== null}
            title={"Enter the training plan name"}
            hintInput={"Enter the name"}
            submitInput={async(input) => await SubmitInput(input)}
            closeDialog={() => setCopyTrainingPlanId(null)}/>
          {trainingPlans.length === 0 ? 
            <Text style={styles({theme}).text}>{Resources.Texts.NoTrainingPlans}</Text>
          : <FlatList
              refreshControl={
                <RefreshControl 
                  refreshing={refreshTrainingPlans === true}
                  onRefresh={() => setRefreshTrainingPlans(true)}
                />
              }
              data={trainingPlans}
              renderItem={({item, index}) => {
                return (
                  <ListItem.Swipeable
                    leftWidth={scale(50)}
                    rightWidth={scale(item.assignedTo !== null ? 0 : 50)}
                    minSlideWidth={scale(10)}
                    leftContent={() => (
                      <Animated.View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        entering={FadeInLeft.delay(600)}>
                        <Button
                          containerStyle={{
                            justifyContent: 'center',
                          }}
                          type="clear"
                          icon={{name: 'copy', type: 'font-awesome-5', color: theme.colors.black}}
                          onPress={() => setCopyTrainingPlanId(item.id)}
                        />
                      </Animated.View>
                    )}
                    rightContent={() => (
                      <Animated.View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}
                        entering={FadeInLeft.delay(600)}>
                        <Button
                          containerStyle={{
                            justifyContent: 'center',
                          }}
                          type="clear"
                          icon={{name: 'delete-outline', color: theme.colors.error}}
                          onPress={async () => await DeleteTrainerPlan(item.id)}
                        />
                      </Animated.View>
                    )}>
                    <TrainingPlan
                      key={index}
                      trainingPlan={item}
                      navigation={navigation}
                      theme={theme}
                    />
                  </ListItem.Swipeable>
                );
              }}
            />
          }
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            color={theme.colors.primary}
            size="small"
            placement="right"
            onPress={() => {
                setWeeks(null);
                navigation.navigate(Resources.Screens.CreateTrainingPlan)
              }
            }
          />
        </Animated.View>
      )}
    </Suspense>
  );
};

export default TrainingPlans;
