import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    btnText: {
      color: Resources.Colors.TextColorWhite,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      borderColor: Resources.Colors.BorderColorWhite,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(10),
      margin: scale(10),
      width: scale(250),
      height: verticalScale(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    view: {
      flex: 1,
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      marginVertical: scale(10),
    },
  });
};
