import {Text, TextInput} from 'react-native';
import React, {useState, useContext, Suspense} from 'react';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import styles from './styles';
import {LoadingScreen, SportsClubContext, UserContext} from '../../../App';
import Resources from '../../Resources';
import CustomButton from '../../components/customButton';
import { ApiConstants } from '../../api/ApiConstants';
import { PostCall } from '../../api/PostCall';
import { ToastAndroid } from 'react-native';
import { useTheme } from '@rneui/themed';

const CreateSubscription = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const {reloadSubscriptionsState} = useContext(SportsClubContext)
  const [reloadSubscriptions, setReloadSubscriptions] = reloadSubscriptionsState;

  const [name, setName] = useState(null);
  const [details, setDetails] = useState(null);
  const [price, setPrice] = useState(null);

  const SavePress = async () => {
    const body = {
        "name": name,
        "price": price,
        "details": details
    }

    const resp = await PostCall({endpoint: ApiConstants({ids: [roleSpecificData.id]}).Subscriptions, body: body, token: token});
    if (resp.status === 201) {
      ToastAndroid.show(
        Resources.Texts.NotificationSubscriptionCreatedSuccessfully,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      setReloadSubscriptions(true)
      navigation.navigate(Resources.Screens.Subscriptions)
    } else {
      ToastAndroid.show(
        Resources.Texts.NotificationSubscriptionNotCreated,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.View style={styles({theme: theme}).view} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Text style={styles({theme: theme}).heading}>{Resources.Texts.CreateSubscription}</Text>
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setName}
          placeholder={Resources.Placeholders.Name}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setDetails}
          placeholder={Resources.Placeholders.Details}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        <TextInput
          style={styles({theme: theme}).textInput}
          onChangeText={setPrice}
          placeholder={Resources.Placeholders.Price}
          placeholderTextColor={Resources.Colors.PlaceholdersColor}
        />
        <CustomButton
          styles={styles({theme: theme})}
          btnText={Resources.ButtonTexts.SaveBtnText} 
          onPress={async() => await SavePress()}/>
      </Animated.View>
    </Suspense>
  );
};

export default CreateSubscription;
