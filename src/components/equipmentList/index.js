import {Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Equipment from '../equipment';
import styles from './styles';
import {LoadingScreen, UserContext} from '../../../App';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';

const EquipmentList = ({facilityId}) => {
  const [equipment, setEquipment] = useState(null);
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: facilityId === null ? ApiConstants({ids: [facilityId]}).Equipment  : ApiConstants({ids: [facilityId]}).Equipment,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setEquipment(data);
      } else {
        setEquipment([1, 1, 1, 1, 1, 1, 1]);
      }
    })();
  }, []);

  return (
    <>
      {equipment === null ? LoadingScreen() : 
        <Animated.View
          style={styles.view}
          entering={FadeInUp.delay(300)}
          exiting={FadeOutDown}>
          {equipment !== null && <Text style={styles.equipmentText}>{`Equipment (${equipment?.length})`}</Text>}
          {equipment?.length > 0 ? 
            <FlatList data={equipment} renderItem={Equipment} />
            : <Text style={styles.noEquipmentText}>No equipment</Text>
          }
        </Animated.View>
      }
    </>
  );
};

export default EquipmentList;
