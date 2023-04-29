import {View, Text} from 'react-native';
import React, {Suspense} from 'react';
import styles from './styles';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Resources from '../../Resources';
import {scale} from 'react-native-size-matters';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import { LoadingScreen } from '../../../App';
import { useTheme } from '@rneui/themed';

const TrainerHome = () => {

  const {theme} = useTheme();

  return (
    <Suspense fallback={LoadingScreen()}>
      <Animated.ScrollView
        entering={FadeInLeft}
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).viewContainer}>
        <View style={styles({theme: theme}).flexRow}>
          <CustomButtonWithIcon
            icon={() => (
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="My forms"
            styles={styles({theme: theme})}
          />
          <CustomButtonWithIcon
            icon={() => (
              <FontAwesome
                name="wpforms"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="Client forms"
            styles={styles({theme: theme})}
          />
        </View>
        <View style={styles({theme: theme}).flexRow}>
          <CustomButtonWithIcon
            icon={() => (
              <Ionicons
                name="person"
                color={theme.colors.black}
                size={scale(20)}
              />
            )}
            btnText="My profile"
            styles={styles({theme: theme})}
          />
        </View>
      </Animated.ScrollView>
    </Suspense>
  );
};

export default TrainerHome;
