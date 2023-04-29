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
    view: {
      flex: 1,
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      marginVertical: scale(10),
      maxWidth: scale(300)
    },
  });
};
