import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
      fontWeight: 'bold',
      fontSize: scale(14)
    },
    addView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(10),
      marginVertical: verticalScale(10),
      borderRadius: moderateScale(5),
      paddingVertical: scale(20),
      width: scale(250),
      marginBottom: verticalScale(10),
      backgroundColor: theme.colors.grey5,
    },
    btnText: {
      color: theme.colors.black,
      fontSize: verticalScale(12),
      fontWeight: 'bold'
    },
    button: {
      margin: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    saveButton: {
      marginVertical: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      width: scale(240),
      height: scale(40),
      borderRadius: moderateScale(5),
    },
    buttonsWindow: {
      flexDirection: 'row',
      gap: moderateScale(30),
    },
    view: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    viewContainer: {
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
    },
  });
};
