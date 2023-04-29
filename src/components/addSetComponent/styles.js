import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      width: scale(280),
      borderRadius: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: verticalScale(10),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      gap: verticalScale(10),
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
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold',
    },
    textInput: {
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey3 : theme.colors.grey3,
      fontSize: Resources.FontSize.regularText,
      width: scale(50),
      height: scale(30),
      padding: scale(5),
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: moderateScale(3),
    },
    button: {
      borderColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      borderWidth: moderateScale(1),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey3 : theme.colors.grey3,
      width: scale(90),
      height: verticalScale(30),
      borderRadius: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.regularText,
    },
  });
};
