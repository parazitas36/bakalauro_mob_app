import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {Suspense} from 'react';
import {LoadingScreen, UserContext} from '../../../App';
import {useContext} from 'react';
import {useState} from 'react';
import {ApiConstants} from '../../api/ApiConstants';
import {useTheme, Text, Input, Button} from '@rneui/themed';
import TrainingPlanForm from '../../components/trainingPlanForm';
import {ToastAndroid} from 'react-native';
import {PostCall} from '../../api/PostCall';
import { useMemo } from 'react';

const CreateTrainingPlanOffer = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const trainingPlanForm = route?.params?.trainingPlanForm;
  const pattern = /^[0-9]+(\,[0-9]{2})?$/;

  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);
  const [details, setDetails] = useState(null);

  const {theme} = useTheme();

  const isValueEmpty = val => {
    return val === null || String(val)?.trim() === '';
  };

  const SavePress = async () => {
    const isValid =
      !isValueEmpty(details) &&
      pattern.test(priceTo) &&
      pattern.test(priceFrom) &&
      Number(priceFrom) <= Number(priceTo);

    if (isValid) {
      const body = {
        TrainingPlanFormId: trainingPlanForm.id,
        Details: details,
        PriceFrom: String(priceFrom).replace(',', '.'),
        PriceTo: String(priceTo).replace(',', '.'),
      };

      const resp = await PostCall({
        endpoint: ApiConstants().TrainingPlanOffers,
        token: token,
        body: body,
      });

      if (resp.status === 201) {
        ToastAndroid.show(
          'Offer was made successfully!',
          ToastAndroid.SHORT,
        );
        navigation.goBack();
      } else {
        ToastAndroid.show(
          'Offer was not made!',
          ToastAndroid.SHORT,
        );
      }

    } else {
      ToastAndroid.show(
        Number(priceFrom) > Number(priceTo)
          ? 'Price from cannot be bigger than price to!'
          : 'Check error messages near fields!',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View entering={FadeInLeft} style={styles({theme: theme}).view}>
        <TrainingPlanForm data={trainingPlanForm} theme={theme} />
        <Text h4 h4Style={styles({theme: theme}).heading}>
          Fill your offer details
        </Text>
        <Input
          containerStyle={styles({theme: theme}).textInputContainer}
          inputStyle={styles({theme: theme}).textInput}
          placeholder="Details"
          value={details}
          errorMessage={isValueEmpty(details) && 'Field is required!'}
          onChangeText={setDetails}
          maxLength={250}
        />
        <Input
          containerStyle={styles({theme: theme}).textInputContainer}
          inputStyle={styles({theme: theme}).textInput}
          placeholder="Price from"
          value={priceFrom}
          selectTextOnFocus={true}
          errorMessage={
            isValueEmpty(priceFrom) ? 'Field is required!' : !pattern.test(priceFrom)
              ? 'Value must be in the right format! Example: 19,99' : null
          }
          onChangeText={setPriceFrom}
          keyboardType="number-pad"
        />
        <Input
          containerStyle={styles({theme: theme}).textInputContainer}
          inputStyle={styles({theme: theme}).textInput}
          placeholder="Price to"
          value={priceTo}
          selectTextOnFocus={true}
          errorMessage={
            isValueEmpty(priceTo) ? 'Field is required!' : !pattern.test(priceTo)
              ? 'Value must be in the right format! Example: 19,99' : null
          }
          onChangeText={setPriceTo}
          keyboardType="number-pad"
        />
        <Button
          title="Offer"
          buttonStyle={styles({theme: theme}).button}
          titleStyle={styles({theme: theme}).titleStyle}
          onPress={async() => await SavePress()}
        />
      </Animated.View>
    </Suspense>
  );
};

export default CreateTrainingPlanOffer;
