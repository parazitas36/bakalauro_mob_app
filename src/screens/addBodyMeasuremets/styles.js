import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return (
    StyleSheet.create({
      view: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      input: {
        maxWidth: scale(150)
      },
      inputText: {
        fontSize: Resources.FontSize.regularText
      },
      buttonStyle: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.black,
        borderWidth: moderateScale(1.25),
        borderRadius: moderateScale(5),
        width: scale(200)
      },
      buttonText: {
        fontSize: Resources.FontSize.btnText,
        color: theme.colors.black
      },
      flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }
    })
  )
} ;
