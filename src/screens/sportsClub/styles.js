import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    btnText: {
      color: theme.colors.black,
      fontWeight: 'bold',
      fontSize: Resources.FontSize.btnText,
    },
    button: {
      borderColor: theme.colors.black,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(5),
      margin: verticalScale(5),
      width: scale(280),
      height: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    view: {
      flex: 1,
      paddingTop: 10,
      alignItems: 'center',
      backgroundColor: theme.colors.background
    },
    subView: {
      width: '50%',
    },
    text: {
      fontSize: Resources.FontSize.btnText,
    },
    boldText: {
      fontSize: Resources.FontSize.btnText,
      fontWeight: 'bold',
    },
    details: {
      alignSelf: 'center',
      maxWidth: scale(300),
      width: scale(300),
    },
    heading: {
      fontSize: Resources.FontSize.headingText,
      margin: scale(10),
      maxWidth: scale(300),
      maxHeight: scale(300),
    },
    reviewView: {
      width: scale(300),
      borderRadius: moderateScale(5),
      marginVertical: verticalScale(5),
      marginBottom: verticalScale(10),
      gap: moderateScale(10),
    },
    flexRow: {
      flexDirection: 'row',
      paddingHorizontal: scale(5),
      gap: moderateScale(3),
      alignItems: 'center',
    },
    ratingText: {
      fontSize: verticalScale(15),
    },
    reviewText: {
      borderRadius: moderateScale(5),
      textAlignVertical: 'top',
      color: theme.colors.black,
      maxHeight: verticalScale(100),
    },
  });
};
