import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    card: {
      width: scale(250),
      borderWidth: 1,
      borderColor: theme.colors.black,
      borderRadius: moderateScale(15),
      marginHorizontal: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: verticalScale(5),
    },
    titleView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.subscriptionTitle,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.black,
      maxWidth: scale(220),
      width: scale(220),
      textAlign: 'center',
      padding: moderateScale(5),
    },
    detailsView: {
      paddingHorizontal: scale(15),
      width: '100%',
      paddingVertical: verticalScale(10),
    },
    detailsText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.regularText,
    },
  });
};
