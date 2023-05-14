import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    titleText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      fontSize: Resources.FontSize.heading4Text,
      textAlign: 'center',
      color: theme.colors.black,
    }
  });
};
