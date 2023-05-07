import {useContext} from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import {Animated} from 'react-native';
import {UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';

const TrainerJobOffers = () => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [trainingPlanOffers, setTrainingPlanOffers] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants().TrainingPlanOffers,
        token: token,
      });

      console.log(resp);

      const data = await resp.json();

      console.log(data)
    })();
  });

  return (
    <Animated.View>
      <FlatList />
    </Animated.View>
  );
};

export default TrainerJobOffers;
