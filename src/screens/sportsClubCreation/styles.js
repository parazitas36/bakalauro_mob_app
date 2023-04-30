import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
    },
    container: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      width: scale(250),
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(10),
    },
    animatedView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      width: scale(250),
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(5),
      maxHeight: verticalScale(70),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      textAlign: 'center',
      paddingHorizontal: scale(10),
      margin: scale(10),
    },
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      padding: moderateScale(10),
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(10),
      margin: scale(10),
      marginTop: 20,
      width: scale(250),
      justifyContent: 'center',
      alignItems: 'center',
    },
    errors: {
      color: theme.colors.error,
      fontSize: Resources.FontSize.validationText,
      alignSelf: 'center',
    },
  });
};
