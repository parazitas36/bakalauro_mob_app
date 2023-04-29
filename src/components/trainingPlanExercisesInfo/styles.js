import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    },
    heading: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.heading2Text,
      margin: scale(10),
    },
    view: {
      height: verticalScale(100),
      width: scale(300),
      borderRadius: moderateScale(5),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      flexDirection: 'row',
      marginTop: verticalScale(15),
    },
    subView: {
      width: scale(150),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
