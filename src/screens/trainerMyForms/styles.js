import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
};
