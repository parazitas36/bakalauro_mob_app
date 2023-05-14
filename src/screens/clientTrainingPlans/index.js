import React, {useContext, Suspense, useEffect, useState} from 'react';
import Animated, {FadeInDown, FadeInLeft, FadeOutUp} from 'react-native-reanimated';

import styles from './styles';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {FlatList} from 'react-native';
import TrainingPlan from '../../components/trainingPlan';
import { Button, ListItem, Text, Tooltip, useTheme } from '@rneui/themed';
import { scale } from 'react-native-size-matters';

const ClientTrainingPlans = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const clientId = route?.params?.clientId;

  const {theme} = useTheme();

  const [trainingPlans, setTrainingPlans] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants({ids: [clientId]}).ClientTrainingPlans}`,
        token: token,
      });

      console.log('client plans: ', resp)

      if (resp.status === 200) {
        const data = await resp.json();
        setTrainingPlans(data);
      } else {
        setTrainingPlans([]);
      }
    })();
  }, []);


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
                    rightWidth={0}
                    minSlideWidth={scale(10)}
                    leftContent={() => (
                      <Animated.View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        entering={FadeInLeft.delay(600)}>
                        <Tooltip
                          withPointer={false}
                          visible={false}
                          backgroundColor={theme.colors.black}
                          popover={
                            <Text style={{color: theme.colors.white}}>
                              Assign training plan
                            </Text>
                          }
                        />
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
                          onLongPress={() => {} /*setLeftToolTipOpen(true)*/}
                          onPressOut={() => {} /*setLeftToolTipOpen(false)*/}
                        />
                      </Animated.View>
                    )}
                  >
                    <TrainingPlan
                      key={index}
                      trainingPlan={item}
                      navigation={navigation}
                      theme={theme}
                      clientId={clientId}
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

export default ClientTrainingPlans;
