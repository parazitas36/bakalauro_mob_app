import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
    view: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    flexRow: {
      flexDirection: 'row',
    },
    heading: {
      color: theme.colors.black,
      fontWeight: '400',
      fontSize: Resources.FontSize.headingText,
      marginBottom: scale(10),
      maxWidth: scale(300)
    },
  });
};
