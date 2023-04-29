import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    infoView: {
      width: scale(280),
      flexDirection: 'row',
    },
    card: {
      width: scale(280),
      borderRadius: moderateScale(5),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      marginHorizontal: scale(10),
      marginTop: verticalScale(10),
      alignSelf: 'center',
      paddingVertical: verticalScale(5),
    },
    exerciseHeader: {
      fontSize: Resources.FontSize.heading2Text,
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      textAlign: 'center',
      textAlignVertical: 'center',
      minHeight: verticalScale(30),
      maxHeight: verticalScale(50),
    },
    subView: {
      width: scale(140),
      flexDirection: 'column',
      padding: scale(5),
    },
    text: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.regularText,
    },
    boldText: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold',
    },
  });
};
