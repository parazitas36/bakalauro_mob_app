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
      borderRadius: moderateScale(5),
      marginVertical: scale(10),
      width: scale(135),
      height: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    view: {
      flex: 1,
    },
    viewContent: {
      alignItems: 'center',
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
      textAlign: 'center',
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: scale(300)
    },
  });
};
