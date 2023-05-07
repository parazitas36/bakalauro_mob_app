import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: verticalScale(20)
    },
    buttonStyle: {
      marginTop: verticalScale(10),
      width: scale(200),
      alignSelf: 'center',
      borderRadius: moderateScale(5),
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1.25),
    },
    buttonTitle: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
    }
  });
};
