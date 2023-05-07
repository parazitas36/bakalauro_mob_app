import {Button, Card, Icon, Input, Image, Text, useTheme} from '@rneui/themed';
import React from 'react';
import { useContext } from 'react';
import {useState} from 'react';
import {Animated, ToastAndroid, View} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { scale, verticalScale } from 'react-native-size-matters';
import { UserContext } from '../../../App';
import { ApiConstants } from '../../api/ApiConstants';
import { PostFormData } from '../../api/PostFormData';
import styles from './styles';

const AddBodyMeasurements = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  console.log(route.params.height)

  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(route.params.height);
  const [shoulders, setShoulders] = useState(null);
  const [chest, setChest] = useState(null);
  const [waist, setWaist] = useState(null);
  const [hips, setHips] = useState(null);
  const [image, setImage] = useState(null);

  const pattern = /^[0-9]+(\,[0-9][0-9]?)?$/;

  const addImage = async () => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel !== true) {
        const imageResult = result?.assets.at(0);
        if (imageResult) {
          console.log(imageResult)
          setImage(imageResult);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const IsOptionalFieldValid = (val) => {
    return (val === null || val === '') || pattern.test(val)
  }

  const IsRequiredFieldValid = (val) => {
    return val !== null && val !== '' &&  pattern.test(val);
  }

  const SavePress = async() => {
    const isValid = IsRequiredFieldValid(height)
      && IsRequiredFieldValid(weight)
      && IsOptionalFieldValid(chest)
      && IsOptionalFieldValid(shoulders)
      && IsOptionalFieldValid(waist)
      && IsOptionalFieldValid(hips);

    if (isValid === true) {
      const formData = new FormData();

      formData.append('Height', height);
      formData.append('Weight', weight);

      if (shoulders !== null && shoulders !== '') {
        formData.append('Shoulders', shoulders);
      }
      if (chest !== null && chest !== '') {
        formData.append('Chest', chest);
      }
      if (waist !== null && waist !== '') {
        formData.append('Waist', waist);
      }
      if (hips !== null && hips !== '') {
        formData.append('Hips', hips);
      }
      if (image !== null) {
        formData.append('Image', {
          uri: String(image.uri),
          type: String(image.type),
          name: String(image.fileName)
        });
      }

      const resp = await PostFormData({endpoint: ApiConstants().BodyMeasurements, token: token, formData: formData});

      if (resp.status === 201) {
        ToastAndroid.show(
          'Body measurements added successfully!',
          ToastAndroid.SHORT
        );

        navigation.goBack();
      } else {
        ToastAndroid.show(
          'Body measurements were not added, try again!',
          ToastAndroid.SHORT
        );
      }
    }
  }

  return (
    <Animated.ScrollView style={{flex: 1}} contentContainerStyle={styles({theme: theme}).view}>
      <Text h4 style={{marginVertical: verticalScale(5)}}>Enter your body measurements</Text>
      <View style={styles({theme: theme}).flexRow}>
        <Input 
          value={height}
          leftIcon={{type: 'material-community', name: 'human-male-height'}}
          containerStyle={styles({theme: theme}).input}
          inputStyle={styles({theme: theme}).inputText}
          onChangeText={setHeight}
          keyboardType='number-pad'
          placeholder='Height (cm)'
          errorMessage={height == null || height == '' ? 'Field is required' : !pattern.test(height) ? 'Value must be in the right format! Example: 99,88' : ''}
        />
        <Input 
          value={weight}
          leftIcon={{type: 'material-community', name: 'scale-bathroom'}}
          containerStyle={styles({theme: theme}).input}
          inputStyle={styles({theme: theme}).inputText}
          onChangeText={setWeight}
          keyboardType='number-pad'
          placeholder='Weight (kg)'
          errorMessage={weight == null || weight == '' ? 'Field is required' : !pattern.test(weight) ? 'Value must be in the right format! Example: 99,88' : ''}
        />
      </View>
      <View style={styles({theme: theme}).flexRow}>
        <Input 
          value={chest}
          containerStyle={styles({theme: theme}).input}
          inputStyle={styles({theme: theme}).inputText}
          onChangeText={setChest}
          keyboardType='number-pad'
          placeholder='Chest width (cm)'
          errorMessage={chest != null && chest != '' && !pattern.test(chest) ? 'Value must be in the right format! Example: 99,88' : ''}
        />
        <Input 
          value={shoulders}
          containerStyle={styles({theme: theme}).input}
          inputStyle={styles({theme: theme}).inputText}
          onChangeText={setShoulders}
          keyboardType='number-pad'
          placeholder='Shoulders width (cm)'
          errorMessage={shoulders != null && shoulders != '' && !pattern.test(shoulders) ? 'Value must be in the right format! Example: 99,88' : ''}
        />
      </View>
      <View style={styles({theme: theme}).flexRow}>
        <Input 
          value={waist}
          containerStyle={styles({theme: theme}).input}
          inputStyle={styles({theme: theme}).inputText}
          onChangeText={setWaist}
          keyboardType='number-pad'
          placeholder='Waist width (cm)'
          errorMessage={waist != null && waist != '' && !pattern.test(waist) ? 'Value must be in the right format! Example: 99,88' : ''}
        />
        <Input 
          value={hips}
          containerStyle={styles({theme: theme}).input}
          inputStyle={styles({theme: theme}).inputText}
          onChangeText={setHips}
          keyboardType='number-pad'
          placeholder='Hips width (cm)'
          errorMessage={hips != null && hips != '' && !pattern.test(hips) ? 'Value must be in the right format! Example: 99,88' : ''}
        />
      </View>
      {image !== null &&
      <Image
        style={{width: scale(100), height: scale(100), resizeMode: 'center'}}
        source={{ uri: image.uri }}
      />}
      <Button 
        title={image === null ? 'Add image' : 'Change image'}
        buttonStyle={{...styles({theme: theme}).buttonStyle, marginTop: verticalScale(10)}}
        titleStyle={styles({theme: theme}).buttonText}
        onPress={async() => await addImage()}
      />
      <Button 
        title={'Save'}
        buttonStyle={{...styles({theme: theme}).buttonStyle, marginTop: verticalScale(10)}}
        titleStyle={styles({theme: theme}).buttonText}
        onPress={async() => await SavePress()}
      />
    </Animated.ScrollView>
  );
};

export default AddBodyMeasurements;
