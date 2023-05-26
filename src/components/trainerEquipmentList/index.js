import {RefreshControl} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Equipment from '../equipment';
import styles from './styles';
import {LoadingScreen, SportsClubContext, TrainerContext, UserContext} from '../../../App';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Resources from '../../Resources';
import { FAB } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostCall } from '../../api/PostCall';
import DialogInput from 'react-native-dialog-input';
import { useTheme, Text } from '@rneui/themed';

const TrainerEquipmentList = ({navigation, route}) => {
  const [reload, setReload] = useState(false)
  const [equipment, setEquipment] = useState(null);
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const {selectedEquipmentState} = useContext(TrainerContext)
  const [selectedEquipment, setSelectedEquipment] = selectedEquipmentState;

  const {theme} = useTheme();

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants().TrainerEquipment,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setEquipment(data);
      } else {
        setEquipment([]);
      }
    })();
  }, []);
  
  return (
    <>
      {equipment === null ? LoadingScreen() : 
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInUp.delay(300)}
          exiting={FadeOutDown}>
          {equipment !== null && <Text style={styles({theme: theme}).equipmentText}>{`Equipment (${equipment?.length})`}</Text>}
          {equipment?.length > 0 ? 
            <FlatList 
              refreshControl={
                <RefreshControl
                  refreshing={reload}
                  onRefresh={() => setReload(true)}
                />
              } 
              data={equipment} 
              renderItem={({item, index}) => {
                return <TouchableOpacity onPress={() => { setSelectedEquipment(item); navigation.goBack() }}>
                  <Equipment equipment={item} key={index} theme={theme} />
                </TouchableOpacity>
              }} />
            : <Text style={styles({theme: theme}).noEquipmentText}>No equipment</Text>
          }
        </Animated.View>
      }
    </>
  );
};
export default React.memo(TrainerEquipmentList);
