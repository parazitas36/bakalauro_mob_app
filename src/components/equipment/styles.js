import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    card: {
      width: scale(250),
      maxWidth: scale(250),
      borderRadius: moderateScale(5),
      elevation: 5,
    },
    equipmentView: {
      minHeight: verticalScale(50),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.black,
      fontSize: verticalScale(14),
      marginVertical: verticalScale(10),
      width: scale(250),
      maxWidth: scale(250),
    },
    descriptionView: {
      justifyContent: 'center',
      paddingHorizontal: scale(10),
      paddingVertical: verticalScale(10),
      width: scale(220),
      borderTopColor: theme.colors.black,
      borderTopWidth: 1,
    },
    descriptionText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.regularText,
      textAlign: 'center',
      marginTop: verticalScale(10),

    },
    image: {
      width: scale(100),
      height: scale(100),
      borderRadius: 10,
      marginTop: verticalScale(10),
    },
  });
};
