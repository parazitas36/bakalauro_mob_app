import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import {scale} from 'react-native-size-matters';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {Suspense} from 'react';
import {LoadingScreen, UserContext} from '../../../App';
import {useEffect} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {FAB, useTheme, Text} from '@rneui/themed';
import TrainingPlanForm from '../../components/trainingPlanForm';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native';

const UserForms = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [reload, setReload] = useState(false);

  const {theme} = useTheme();

  const [userForms, setUserForms] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: userData.role === 'Trainer' ? 
                    ApiConstants().TrainingPlanForms 
                    : ApiConstants().UsersTrainingPlanForms,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setUserForms(data);
      } else {
        setUserForms([]);
      }

      setReload(false)
    })();
  }, [reload === true]);

  if (userData.role === 'Trainer') {
    return (
      <Suspense fallback={LoadingScreen()}>
        {userForms === null ? LoadingScreen() : 
          <Animated.View entering={FadeInLeft.delay(300)} style={styles({theme: theme}).view}>
            <Text style={styles({theme: theme}).heading}>User forms</Text>
            {userForms?.length === 0 ? <Text style={styles({theme: theme}).text}>No forms found</Text>
            : <FlatList
                style={{minWidth: '100%'}} 
                contentContainerStyle={{alignItems: 'center'}} 
                refreshControl={<RefreshControl onRefresh={() => setReload(true)} refreshing={reload === true} />}
                data={userForms} renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      disabled={item.offered === true}
                      onPress={() => {
                        navigation.navigate({
                          name: 'CreateTrainingPlanOffer',
                          params: { trainingPlanForm: item }
                        })
                      }}>
                      <TrainingPlanForm data={item} theme={theme} />
                    </TouchableOpacity>
                  )
                }} />
              }
          </Animated.View>
        }
      </Suspense>
    );
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      {userForms === null ? LoadingScreen() : 
        <Animated.View entering={FadeInLeft.delay(300)} style={styles({theme: theme}).view}>
          <Text h4 style={styles({theme: theme}).heading}>My forms</Text>
          {userForms?.length === 0 ? <Text style={styles({theme: theme}).text}>No forms created</Text>
          : <FlatList
              style={{minWidth: '100%'}} 
              contentContainerStyle={{alignItems: 'center'}} 
              refreshControl={<RefreshControl onRefresh={() => setReload(true)} refreshing={reload === true} />}
              data={userForms} renderItem={({item}) => {
              return <TrainingPlanForm data={item} theme={theme} />
            }} />}
        </Animated.View>
      }
    </Suspense>
  );
};

export default UserForms;
