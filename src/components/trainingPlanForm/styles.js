import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      width: scale(250),
      borderRadius: moderateScale(5),
      elevation: 5,
    },
    text: {
        fontSize: Resources.FontSize.regularText,
        alignSelf: 'center',
        textAlign: 'justify',
      },
    headings: {
      fontSize: Resources.FontSize.regularText,
      alignSelf: 'center',
      marginVertical: verticalScale(5),
      textDecorationLine: 'underline'
    }
  });
};
