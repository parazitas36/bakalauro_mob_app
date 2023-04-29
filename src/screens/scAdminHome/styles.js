import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
    button: {
      borderRadius: moderateScale(10),
      backgroundColor: theme.colors.grey5,
      margin: scale(10),
      width: scale(120),
      height: scale(120),
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(5),
    },
    view: {
      flex: 1,
    },
    viewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
    },
    sportsClubView: {
      width: scale(300),
      justifyContent: 'center',
      alignItems: 'center',
      height: verticalScale(150),
      backgroundColor:  theme.mode === 'dark' ? theme.colors.grey3 : theme.colors.grey4,
      borderRadius: moderateScale(10),
      gap: verticalScale(5),
    },
    image: {
      width: scale(100),
      height: scale(100),
      borderRadius: moderateScale(10),
    },
    imageView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      width: scale(170),
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingHorizontal: scale(10),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
  });
};
