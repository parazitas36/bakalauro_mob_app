import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
    },
    view: {
      flex: 1,
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      marginBottom: verticalScale(10),
      paddingHorizontal: scale(20),
      textAlign: 'center',
    },
    circleView: {
      width: scale(30), 
      height: scale(30), 
      backgroundColor: theme.colors.primary,
      borderRadius: 90,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: scale(10),
      padding: 0,
    }
  });
};