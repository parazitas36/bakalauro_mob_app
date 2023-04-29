import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    btnText: {
      color: theme.colors.black,
      textDecorationLine: 'underline',
      fontWeight: 'bold',
      fontSize: Resources.FontSize.btnText,
    },
    button: {},
    view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.black,
      justifyContent: 'center',
      fontSize: Resources.FontSize.btnText,
    },
    horizontalFlex: {
      flexDirection: 'row',
      gap: scale(5),
      margin: scale(5),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
      marginTop: scale(0),
    },
    image: {
      width: scale(50),
      height: scale(30),
      padding: 0,
      margin: 0,
    },
  });
};
