import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    card: {
      borderRadius: moderateScale(5),
      elevation: 5,
      width: scale(250),
    },
    text: {
      fontSize: Resources.FontSize.regularText,
      alignSelf: 'center',
      textAlign: 'justify',
    },
    headings: {
      fontSize: Resources.FontSize.regularText * 1.1,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: verticalScale(5),
      textDecorationLine: 'underline'
    }
  });
};
