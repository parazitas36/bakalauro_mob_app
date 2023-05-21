import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
      maxWidth: scale(300),
      width: scale(300),
    },
    details: {
      alignSelf: 'center',
      maxWidth: scale(300),
      width: scale(300),
      marginTop: verticalScale(10),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      textAlign: 'center',
      margin: scale(10),
      maxWidth: scale(300),
      maxHeight: scale(300),
    },
    imageView: {
      height: verticalScale(160),
      width: scale(300),
      borderRadius: moderateScale(5),
      overflow: 'hidden',
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      padding: 0,
      margin: 0,
    },
  });
};
