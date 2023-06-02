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
      width: scale(250),
      height: verticalScale(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: verticalScale(20)
    },
    textInput: {
      color: theme.colors.black,
      borderTopWidth: scale(0),
      borderLeftWidth: scale(0),
      borderRightWidth: scale(0),
      borderBottomWidth: scale(1),
      borderColor: theme.colors.black,
      width: scale(250),
      paddingHorizontal: moderateScale(10),
      marginBottom: verticalScale(5),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
    },
  });
};
