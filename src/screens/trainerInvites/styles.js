import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: theme.colors.background,
      alignItems: 'center'
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
