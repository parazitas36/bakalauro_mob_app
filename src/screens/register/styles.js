import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    scrollView: {
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    view: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollViewBackground: {
      backgroundColor: theme.colors.background,
      flex: 1
    },
    textInput: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      width: scale(300),
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(5),
    },
    dividedTextInput: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      marginBottom: moderateScale(5),
      width: '100%',
      textAlign: 'center',
    },
    dividedView: {
      width: scale(300),
      flexDirection: 'row',
    },
    partOfDividedView: {
      flexDirection: 'column',
      width: '46%',
      marginHorizontal: '2%'
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
      textAlign: 'center',
    },
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(5),
      marginVertical: scale(15),
      width: scale(250),
      height: scale(35),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    errors: {
      color: theme.colors.error,
      fontSize: Resources.FontSize.validationText,
      alignSelf: 'center',
    },
    errorsFlexStart: {
      color: theme.colors.error,
      fontSize: Resources.FontSize.validationText,
      alignSelf: 'center',
    },
  });
};
