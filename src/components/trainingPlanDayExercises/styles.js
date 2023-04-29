import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.black
    },
    view: {
      width: scale(300),
      flexDirection: 'column',
    },
    dayTextView: {
      width: scale(300),
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
      height: verticalScale(30),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: '50%',
      alignItems: 'flex-end',
      paddingRight: scale(5),
    },
    dayText: {
      left: 0,
      fontSize: Resources.FontSize.heading2Text,
      color: theme.colors.black,
      width: '50%',
    },
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1.25),
      borderRadius: moderateScale(10),
      borderStyle: 'dashed',
      margin: scale(10),
      width: scale(100),
      height: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    hidden: {
      height: 0,
      overflow: 'hidden',
    },
  });
};
