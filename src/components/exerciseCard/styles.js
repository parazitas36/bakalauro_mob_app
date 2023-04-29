import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    card: {
      width: scale(250),
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: moderateScale(10),
      marginHorizontal: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: verticalScale(10),
      borderColor: theme.colors.black,
    },
    titleView: {
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: verticalScale(45),
    },
    titleText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.subscriptionTitle,
      maxWidth: scale(220),
      width: scale(220),
      textAlign: 'center',
      padding: moderateScale(5),
    },
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(5),
      margin: scale(10),
      width: '90%',
      height: verticalScale(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
