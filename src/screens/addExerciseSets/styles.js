import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(5),
      width: scale(250),
      height: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 0,
    },
    view: {
      flex: 1,
    },
    contentContainerStyle: {
      alignItems: 'center',
      minHeight: '100%',
      gap: verticalScale(15),
      paddingBottom: verticalScale(20),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      margin: scale(10),
    },
  });
};
