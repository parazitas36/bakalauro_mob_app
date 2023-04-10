import {Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Equipment from '../equipment';
import styles from './styles';
import {LoadingScreen, UserContext} from '../../../App';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Resources from '../../Resources';
import { FAB } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostCall } from '../../api/PostCall';

const EquipmentList = ({facilityId, navigation, editAmountMode}) => {
  const [reload, setReload] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: facilityId === null || facilityId === undefined ? ApiConstants({ids: [roleSpecificData.id]}).SportsClubEquipment 
          : ApiConstants({ids: [facilityId]}).Equipment,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setEquipment(data);
      } else {
        setEquipment([]);
      }
    })();
    setReload(false)
  }, [reload === true]);

  const UpdateAmount = async(equipmentId, amount) => {
    const resp = await PostCall({endpoint: ApiConstants({ids: [facilityId, equipmentId], amount: amount}).EquipmentAmountUpdate, token: token, body: ""});
    console.log(resp)
    setReload(true)
  }

  const EquipmentItem = ({item}) => {
    if(!editAmountMode){
      return Equipment({equipment: item})
    }

    if(editAmountMode){
      return (
        <TouchableOpacity>
          {Equipment({equipment: item})}
        </TouchableOpacity>
      )
    }
  }

  return (
    <>
      {equipment === null ? LoadingScreen() : 
        <Animated.View
          style={styles.view}
          entering={FadeInUp.delay(300)}
          exiting={FadeOutDown}>
          {equipment !== null && <Text style={styles.equipmentText}>{`Equipment (${equipment?.length})`}</Text>}
          {equipment?.length > 0 ? 
            <FlatList data={equipment} renderItem={({item}) => EquipmentItem({item: item})} />
            : <Text style={styles.noEquipmentText}>No equipment</Text>
          }
          {!facilityId && userData?.role === 'SportsClubAdmin' && 
          <FAB
            icon={{name: 'add', color: 'white'}}
            size='small'
            placement='right'
            onPress={() => navigation.navigate({
              name: Resources.Screens.CreateEquipment,
              params: {reloadState: [reload, setReload]},
            })}/>}
        </Animated.View>
      }
    </>
  );
};
export default EquipmentList;
