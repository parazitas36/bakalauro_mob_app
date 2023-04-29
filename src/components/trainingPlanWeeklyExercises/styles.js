import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      marginTop: scale(10),
    },
    view: {
      width: scale(300),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(10),
    },
    hiddenView: {
      height: 0,
      overflow: 'hidden',
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(5),
    },
    icon: {
      alignSelf: 'flex-end',
      marginBottom: scale(2),
    },
  });
};
