import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Resources from '../../Resources';
import { scale } from 'react-native-size-matters';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const TrainerHome = () => {
  return (
    <Animated.ScrollView
      entering={FadeInLeft}
      style={styles.view}
      contentContainerStyle={styles.viewContainer}>
      <View style={styles.flexRow}>
        <CustomButtonWithIcon
          icon={() => <MaterialCommunityIcons name="newspaper-variant-outline" color={Resources.Colors.IconsColor} size={scale(20)} />}
          btnText="My forms"
          styles={styles}
        />
        <CustomButtonWithIcon
          icon={() => <FontAwesome name="wpforms" color={Resources.Colors.IconsColor} size={scale(20)} />}
          btnText="Client forms"
          styles={styles}
        />
      </View>
      <View style={styles.flexRow}>
        <CustomButtonWithIcon
          icon={() => <Ionicons name="person" color={Resources.Colors.IconsColor} size={scale(20)} />}
          btnText="My profile"
          styles={styles}
        />
      </View>
    </Animated.ScrollView>
  );
};

export default TrainerHome;
