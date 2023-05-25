import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
    },
    view: {
      flex: 1,
      paddingTop: 10,
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
    },
  });
};
