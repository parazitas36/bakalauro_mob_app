import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    sportsClubView: {
      width: scale(300),
      maxWidth: scale(300),
      borderRadius: moderateScale(5),
      elevation: 5,
    },
    image: {
      width: scale(100),
      height: scale(100),
      borderRadius: moderateScale(10),
    },
    imageView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      width: scale(180),
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: scale(5),
      paddingLeft: scale(20),
      gap: verticalScale(2)
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
    text: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.btnText,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
  });
};
