import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: verticalScale(20),
    },
    text: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.regularText,
      textAlign: 'justify',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
      maxWidth: scale(300),
      maxHeight: scale(300),
    },
    guideBlock: {
      width: scale(300),
      maxWidth: scale(300),
      maxHeight: verticalScale(250),
      marginVertical: verticalScale(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
