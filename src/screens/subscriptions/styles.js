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
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      marginBottom: verticalScale(10),
      paddingHorizontal: scale(20),
      textAlign: 'center',
    },
    subscriptionsScrollView: {
      flex: 1,
      width: scale(300),
      maxWidth: scale(300),
    },
    subscriptionsScrollViewContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
