import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
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
      height: verticalScale(30),
      width: scale(250),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    view: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    usernameInput: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      width: scale(250),
      paddingHorizontal: moderateScale(10),
      marginBottom: scale(5),
    },
    passwordInput: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      width: scale(250),
      paddingHorizontal: moderateScale(10),
      marginBottom: scale(5),
    },
    errors: {
      color: theme.colors.error,
      fontSize: Resources.FontSize.validationText,
      alignSelf: 'flex-start',
      paddingLeft: scale(5),
      marginBottom: scale(5),
    },
  });
};
