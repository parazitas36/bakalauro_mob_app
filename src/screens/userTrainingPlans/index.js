import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeInLeft, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {Text} from 'react-native';
import {FlatList} from 'react-native';
import TrainingPlan from '../../components/trainingPlan';
import { Button, ListItem, useTheme } from '@rneui/themed';
import { scale } from 'react-native-size-matters';
import { DeleteCall } from '../../api/DeleteCall';
import { ToastAndroid } from 'react-native';

const UserTrainingPlans = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [refreshTrainingPlans, setRefreshTrainingPlans] = useState(false);

  const {theme} = useTheme();

  const [trainingPlans, setTrainingPlans] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants().UserTrainingPlans}`,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setTrainingPlans(data);
      } else {
        setTrainingPlans([]);
      }
    })();
    setRefreshTrainingPlans(false);
  }, [refreshTrainingPlans === true]);

  const DeleteUserPlan = async(trainingPlanId) => {
    const resp = await DeleteCall({
      endpoint: ApiConstants({ids: [trainingPlanId]}).DeleteUserTrainingPlan,
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
          {trainingPlans.length === 0 ? 
            <Text style={styles({theme}).text}>{Resources.Texts.NoTrainingPlans}</Text>
          : <FlatList
              data={trainingPlans}
              renderItem={({item, index}) => {
                return (
                  <ListItem.Swipeable
                    leftWidth={scale(50)}
                    rightWidth={scale(50)}
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
                          icon={{name: 'chart-line', type: 'font-awesome-5', color: theme.colors.black}}
                          onPress={() => {
                            navigation.navigate({
                              name: 'ClientTrainingPlanProgress',
                              params: {trainingPlanId: item.id},
                            });
                          }}
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
                          onPress={async () => await DeleteUserPlan(item.id)}
                        />
                      </Animated.View>
                    )}
                  >
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
        </Animated.View>
      )}
    </Suspense>
  );
};

export default UserTrainingPlans;
