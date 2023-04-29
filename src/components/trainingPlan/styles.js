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
      paddingVertical: verticalScale(15),
      gap: verticalScale(10),
      borderRadius: moderateScale(5),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      marginHorizontal: scale(10),
      alignSelf: 'center',
      marginVertical: verticalScale(10),
    },
    trainingPlanHeader: {
      fontSize: Resources.FontSize.heading2Text,
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    subView: {
      width: scale(140),
      flexDirection: 'column',
      paddingHorizontal: scale(5),
    },
    text: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.regularText,
    },
    boldText: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.regularText * 1.05,
      fontWeight: 'bold',
    },
  });
};
