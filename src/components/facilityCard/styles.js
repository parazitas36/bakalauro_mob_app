import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    card: {
      width: scale(250),
      borderWidth: 1,
      borderColor: theme.colors.black,
      borderRadius: moderateScale(10),
      marginVertical: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
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
  });
};
