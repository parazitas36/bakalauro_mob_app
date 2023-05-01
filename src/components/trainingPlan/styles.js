import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    infoView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    card: {
      width: scale(280),
      maxWidth: scale(280),
      borderRadius: moderateScale(5),
      elevation: 5,
    },
    trainingPlanHeader: {
      fontSize: Resources.FontSize.heading2Text,
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    subView: {
      flexDirection: 'column',
      width: '50%',
    },
    text: {
      fontSize: Resources.FontSize.regularText,
    },
    boldText: {
      fontSize: Resources.FontSize.regularText * 1.05,
      fontWeight: 'bold',
    },
  });
};
