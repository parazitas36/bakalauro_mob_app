import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
    view: {
      flex: 1,
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
    },
    heading: {
      marginVertical: scale(10),
      maxWidth: scale(300)
    },
    textInputContainer: {
      width: scale(250),
      maxWidth: scale(250),
    },
    textInput: {
      fontSize: Resources.FontSize.regularText,
      paddingHorizontal: scale(5),
      paddingVertical: 0,
    },
    button: {
      width: scale(200),
      maxWidth: scale(200),
      backgroundColor: theme.colors.background,
      borderWidth: moderateScale(1.25),
      borderColor: theme.colors.black,
      borderRadius: moderateScale(5),
      marginVertical: verticalScale(5),
    },
    titleStyle: {
      color: theme.colors.black
    }
  });
};
