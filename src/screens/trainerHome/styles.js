import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    btnText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
      textAlign: 'center'
    },
    button: {
      borderRadius: moderateScale(10),
      backgroundColor: theme.colors.grey5,
      margin: scale(10),
      width: scale(135),
      height: scale(135),
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(5),
      elevation: 5
    },
    view: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    viewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
    },
  });
};
