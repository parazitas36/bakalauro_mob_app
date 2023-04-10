import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, { FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp } from 'react-native-reanimated';
import {TextInput} from 'react-native';

import styles from './styles';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import { Validation } from './validation';
import { PostCall } from '../../api/PostCall';
import { ApiConstants } from '../../api/ApiConstants';
import { ToastAndroid } from 'react-native';

const CreateEquipment = ({navigation, route}) => {
  const [reload, setReload] = route?.params?.reloadState;
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {reloadFacilitiesState} = useContext(SportsClubContext)
  const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [validation, setValidation] = useState(null);

  const validationMemo = useMemo(() => {
    return Validation(name, description);
  }, [name, description])

  const isFormValid =
    validationMemo !== null &&
    validationMemo?.validName && validationMemo?.validDescription

  const SavePress = async() => {
    if (isFormValid) {
      const body = {
        "name": name,
        "description": description,
        "imageUri": "https://random.imagecdn.app/500/300"
      };

      const resp = await PostCall({endpoint: ApiConstants({ids: [roleSpecificData.id]}).SportsClubEquipment, body: body, token: token});

      console.log(resp)

      if(resp.status === 201) {
        ToastAndroid.show(
          Resources.Texts.NotificationEquipmentCreatedSuccessFully,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setReload(true)
        navigation.navigate(Resources.Screens.EquipmentList)
      } else {
        ToastAndroid.show(
          Resources.Texts.NotificationEquipmentNotCreated,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } 

    setValidation(validationMemo);
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles.view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>
          {Resources.Texts.FillEquipmentInfo}
        </Animated.Text>
        <TextInput 
          style={styles.textInput} 
          value={name} placeholder={Resources.Placeholders.Name} 
          onChangeText={setName}
          placeholderTextColor={Resources.Colors.PlaceholdersColor} />
        <TextInput 
          style={styles.textInput} 
          value={description} placeholder={Resources.Placeholders.Description} 
          onChangeText={setDescription}
          placeholderTextColor={Resources.Colors.PlaceholdersColor} />
        <CustomButton btnText={Resources.ButtonTexts.SaveBtnText} onPress={async() => await SavePress()} styles={styles}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateEquipment;
