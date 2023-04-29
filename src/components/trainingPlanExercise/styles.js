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
      paddingVertical: verticalScale(15),
      width: scale(280),
      borderRadius: moderateScale(5),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      alignSelf: 'center',
    },
    exerciseHeader: {
      fontSize: Resources.FontSize.heading2Text,
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    text: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    },
    boldText: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontWeight: 'bold'
    },
    subView: {
      width: scale(140),
      flexDirection: 'column',
      padding: scale(5),
    },
  });
};
