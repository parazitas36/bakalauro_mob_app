import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Resources from '../../Resources';
import { scale } from 'react-native-size-matters';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const UserHome = ({navigation}) => {
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
          icon={() => <FontAwesome5 name="weight" color={Resources.Colors.IconsColor} size={scale(20)} />}
          btnText="My body measurements"
          styles={styles}
        />
      </View>
      <View style={styles.flexRow}>
      <CustomButtonWithIcon
          icon={() => <Entypo name="sports-club" color={Resources.Colors.IconsColor} size={scale(20)} />}
          btnText="Sports clubs"
          onPress={() => navigation.navigate('SportsClubs')}
          styles={styles}
        />
        <CustomButtonWithIcon
          icon={() => <Ionicons name="people" color={Resources.Colors.IconsColor} size={scale(20)} />}
          btnText="Trainers"
          styles={styles}
        />
      </View>
    </Animated.ScrollView>
  );
};

export default UserHome;
