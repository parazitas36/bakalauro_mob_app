import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      width: scale(280),
      borderRadius: moderateScale(5),
      paddingVertical: verticalScale(10),
    },
    header: {
      color: Resources.Colors.TextColorWhite,
      fontSize: Resources.FontSize.heading2Text,
      justifyContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
      textAlignVertical: 'center',
    },
    infoView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subView: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: verticalScale(5),
    },
    boldText: {
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold',
    },
    textInput: {
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1.25),
      fontSize: Resources.FontSize.regularText,
      color: theme.colors.black,
      width: scale(50),
      height: scale(30),
      padding: scale(5),
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: moderateScale(3),
      alignSelf: 'center'
    },
    button: {
      backgroundColor: theme.colors.black,
      width: scale(90),
      height: verticalScale(30),
      borderRadius: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: theme.colors.white,
      fontSize: Resources.FontSize.regularText,
    },
  });
};
