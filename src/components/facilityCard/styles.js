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
    cityView: {
      minHeight: verticalScale(30),
      width: scale(230),
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
    },
    cityText: {
      color: theme.colors.black,
      fontSize: verticalScale(14),
      maxWidth: scale(230),
      width: scale(230),
      padding: moderateScale(2),
    },
    contactsView: {
      justifyContent: 'center',
      minHeight: verticalScale(40),
      paddingHorizontal: scale(10),
      paddingVertical: verticalScale(10),
      alignSelf: 'flex-start',
    },
    contactsText: {
      color: theme.colors.black,
      fontSize: verticalScale(10),
    },
    flexBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(5),
      maxWidth: scale(250),
      paddingHorizontal: moderateScale(5),
      alignSelf: 'flex-start',
      marginVertical: verticalScale(2)
    },
    text: {
      fontSize: Resources.FontSize.regularText,
      maxWidth: scale(200),
    }
  });
};
