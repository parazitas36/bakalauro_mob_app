import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    infoView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    card: {
      width: scale(280),
      maxWidth: scale(280),
      borderRadius: moderateScale(5),
      alignSelf: 'center',
      marginBottom: verticalScale(5),
      elevation: 5
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
      width: '50%',
      flexDirection: 'column',
    },
    text: {
      fontSize: Resources.FontSize.regularText,
    },
    boldText: {
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold',
    },
  });
};
