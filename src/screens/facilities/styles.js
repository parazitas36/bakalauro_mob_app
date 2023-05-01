import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
    },
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(10),
      margin: scale(10),
      marginBottom: verticalScale(30),
      height: verticalScale(30),
      width: scale(250),
      justifyContent: 'center',
      alignItems: 'center',
    },
    view: {
      flex: 1,
      paddingVertical: verticalScale(10),
    },
    viewContent: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: verticalScale(30)
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
    },
  });
};
