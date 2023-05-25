import {RefreshControl} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Equipment from '../equipment';
import styles from './styles';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Resources from '../../Resources';
import { FAB } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostCall } from '../../api/PostCall';
import DialogInput from 'react-native-dialog-input';
import { useTheme, Text } from '@rneui/themed';

const EquipmentList = ({facilityId, navigation, route}) => {
  const [reload, setReload] = useState(false)
  const [equipment, setEquipment] = useState(null);
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const {theme} = useTheme();

  const editAmountMode = route?.params?.editAmountMode;

  if(facilityId === null || facilityId === undefined) {
    facilityId = route?.params?.facilityId;
  }

  const GetApiCall = () => {
    if(facilityId !== undefined && facilityId !== null && editAmountMode === true) {
      return ApiConstants({ids: [roleSpecificData.id]}).SportsClubEquipment
    } else if (facilityId !== undefined && facilityId !== null) {
      return ApiConstants({ids: [facilityId]}).Equipment;
    }

    return ApiConstants({ids: [roleSpecificData.id]}).SportsClubEquipment;
  }

  if (userData.role === 'SportsClubAdmin') {
    const {reloadEquipmentState} = useContext(SportsClubContext)
    const [reloadEquipment, setReloadEquipment] = reloadEquipmentState;

    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: GetApiCall(),
          token: token,
        });
  
        if (resp.status === 200) {
          const data = await resp.json();
          setEquipment(data);
        } else {
          setEquipment([]);
        }
      })();
      setReloadEquipment(false)
      setReload(false)
    }, [reloadEquipment === true, reload === true]);
  } else {
    useEffect(() => {
      (async () => {
        const resp = await GetCall({
          endpoint: GetApiCall(),
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
  }

  const UpdateAmount = async(equipmentId, amount) => {
    const resp = await PostCall({endpoint: ApiConstants({ids: [facilityId, equipmentId], amount: amount}).EquipmentAmountUpdate, token: token, body: ""});
    setReload(true)
  }

  const EquipmentItem = ({item}) => {
    if(!editAmountMode){
      return Equipment({equipment: item, token: token, theme: theme})
    }

    if(editAmountMode){
      return (
        <TouchableOpacity onPress={() => setSelectedEquipmentId(item.id)}>
          {Equipment({equipment: item, theme: theme})}
        </TouchableOpacity>
      )
    }
  }

  const SubmitInput = async(input) => {
    const amount = Math.floor(Number(input));
    await UpdateAmount(selectedEquipmentId, amount);
    setSelectedEquipmentId(null)
  }

  return (
    <>
      {equipment === null ? LoadingScreen() : 
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInUp.delay(300)}
          exiting={FadeOutDown}>
            <DialogInput isDialogVisible={selectedEquipmentId !== null}
            title={"Enter equipment amount in facility"}
            hintInput={"Enter amount"}
            submitInput={async(input) => SubmitInput(input)}
            textInputProps={{
              keyboardType: 'numeric'
            }}
            closeDialog={() => setSelectedEquipmentId(null)}/>
          {equipment !== null && <Text style={styles({theme: theme}).equipmentText}>{`Equipment (${equipment?.length})`}</Text>}
          {editAmountMode === true && <Text style={styles({theme: theme}).instructionText}>{`Click on equipment to enter the amount`}</Text>}
          {equipment?.length > 0 ? 
            <FlatList 
              refreshControl={
                <RefreshControl
                  refreshing={reload}
                  onRefresh={() => setReload(true)}
                />
              } 
              data={equipment} 
              renderItem={({item, index}) => <EquipmentItem item={item} key={index} />} />
            : <Text style={styles({theme: theme}).noEquipmentText}>No equipment</Text>
          }
          {!editAmountMode && !facilityId && userData?.role === 'SportsClubAdmin' && 
          <FAB
            icon={{name: 'add', color: 'white'}}
            color={theme.colors.primary}
            size='md'
            placement='right'
            onPress={() => navigation.navigate({
              name: Resources.Screens.CreateEquipment,
              params: {},
            })}/>}
        </Animated.View>
      }
    </>
  );
};
export default React.memo(EquipmentList);
