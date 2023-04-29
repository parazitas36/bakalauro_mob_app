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
      justifyContent: 'center',
      alignItems: 'center',
      height: verticalScale(150),
      borderWidth: moderateScale(1.5),
      borderColor: theme.colors.black,
      borderRadius: moderateScale(10),
      gap: verticalScale(5),
      marginVertical: verticalScale(5),
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
      width: scale(170),
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingHorizontal: scale(10),
    },
    heading: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      paddingHorizontal: scale(5),
      textAlign: 'center',
    },
    text: {
      color: theme.colors.black,
    }
  });
};
