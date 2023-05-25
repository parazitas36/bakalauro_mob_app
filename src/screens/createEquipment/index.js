import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
} from 'react-native-reanimated';
import {TextInput} from 'react-native';

import styles from './styles';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Resources from '../../Resources';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import CustomButton from '../../components/customButton';
import {Validation} from './validation';
import {PostCall} from '../../api/PostCall';
import {ApiConstants} from '../../api/ApiConstants';
import {ToastAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { Image } from 'react-native';
import { PostFormData } from '../../api/PostFormData';
import { useTheme } from '@rneui/themed';

const CreateEquipment = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const {reloadFacilitiesState, reloadEquipmentState} = useContext(SportsClubContext);
  const [reloadFacilities, setReloadFacilities] = reloadFacilitiesState;
  const [reloadEquipment, setReloadEquipment] = reloadEquipmentState;

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [validation, setValidation] = useState(null);
  const [image, setImage] = useState(null);

  const validationMemo = useMemo(() => {
    return Validation(name, description);
  }, [name, description]);

  const isFormValid =
    validationMemo !== null &&
    validationMemo?.validName &&
    validationMemo?.validDescription;

  const addImage = async () => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel !== true) {
        const image = result?.assets.at(0);
        if (image) {
          setImage(image);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const SavePress = async () => {
    if (image === null) {
      ToastAndroid.show(
        'You must select the image!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    if (isFormValid) {
      const formData = new FormData();

      formData.append('Name', name);
      formData.append('Description', description);
      formData.append('Image', {
        uri: String(image.uri),
        type: String(image.type),
        name: String(image.fileName)
    })

      const resp = await PostFormData({
        endpoint: ApiConstants({ids: [roleSpecificData.id]})
          .SportsClubEquipment,
        formData: formData,
        token: token,
      });

      if (resp.status === 201) {
        ToastAndroid.show(
          Resources.Texts.NotificationEquipmentCreatedSuccessFully,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setReloadEquipment(true);
        navigation.navigate(Resources.Screens.EquipmentList);
      } else {
        ToastAndroid.show(
          Resources.Texts.NotificationEquipmentNotCreated,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    }

    setValidation(validationMemo);
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View
        style={styles({theme: theme}).view}
        entering={FadeInDown.delay(100)}
        exiting={FadeOutUp}>
        <Animated.Text style={styles({theme: theme}).heading}>
          {Resources.Texts.FillEquipmentInfo}
        </Animated.Text>
        <TextInput
          style={styles({theme: theme}).textInput}
          value={name}
          placeholder={Resources.Placeholders.Name}
          onChangeText={setName}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        <TextInput
          style={styles({theme: theme}).textInput}
          value={description}
          placeholder={Resources.Placeholders.Description}
          onChangeText={setDescription}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        {image !== null ? <Image source={{uri: image?.uri}} style={{height: 100, width: 100}} /> : null}
        <CustomButton
          styles={styles({theme: theme})}
          btnText={image === null ? 'Select image' : 'Change image'}
          onPress={async () => await addImage()}
        />
        <CustomButton
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={async () => await SavePress()}
          styles={styles({theme: theme})}
        />
      </Animated.View>
    </Suspense>
  );
};

export default CreateEquipment;
