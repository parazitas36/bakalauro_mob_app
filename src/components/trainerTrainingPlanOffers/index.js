import { Text, useTheme } from '@rneui/themed';
import {useContext} from 'react';
import { Suspense } from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import { RefreshControl } from 'react-native';
import {FlatList} from 'react-native';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import TrainingPlanOffer from '../trainingPlanOffer';

const TrainerTrainingPlanOffers = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();
  const [trainingPlanOffers, setTrainingPlanOffers] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants().TrainingPlanOffers}${String(userData.role).toLowerCase()}`,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data)
        
        setTrainingPlanOffers(data);
      } else {
        setTrainingPlanOffers([])
      }

      setReload(false);
    })();
  }, [reload === true]);

  return (
      <Animated.View
        entering={FadeInLeft.delay(300)}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {trainingPlanOffers === null ? LoadingScreen()
          : trainingPlanOffers?.length > 0 ? 
          <FlatList
            refreshControl={<RefreshControl onRefresh={() => setReload(true)} refreshing={reload === true}/>}
            style={{minWidth: '100%'}} 
            contentContainerStyle={{alignItems: 'center'}} 
            data={trainingPlanOffers} 
            renderItem={({item, index}) => {
              return <TrainingPlanOffer navigation={navigation} data={item} key={index} theme={theme} reload={reload} setReload={setReload} />
            }}
          />
          : <Text>No training plan offers were found</Text>}
      </Animated.View>
  );
};

export default TrainerTrainingPlanOffers;
