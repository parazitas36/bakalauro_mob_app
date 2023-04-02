import {View, Text} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/customButton';
import styles from './styles';
import Login from '../login';
import Resources from '../../Resources';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import { Image } from 'react-native';

const Welcome = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={styles.view}>
      <Image style={styles.image} source={require('../../assets/images/dumbell.png')}/>
      <Text style={styles.heading}>{Resources.AppName}</Text>
      <Login
        loadingState={{state: [loading, setLoading]}}
        errorState={{state: [error, setError]}}
      />
      <View style={styles.horizontalFlex}>
        <Text style={styles.text}>{Resources.Texts.CreateAccountText}</Text>
        <CustomButton
          btnText={Resources.ButtonTexts.RegisterBtnText}
          styles={styles}
          onPress={() => navigation.navigate(Resources.Screens.Register)}
        />
      </View>
    </Animated.View>
  );
};

export default Welcome;
