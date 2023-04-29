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
      borderRadius: moderateScale(10),
      marginVertical: scale(10),
      width: scale(135),
      height: verticalScale(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    view: {
      flex: 1,
    },
    viewContent: {
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      marginVertical: scale(10),
      maxWidth: scale(300)
    },
  });
};
