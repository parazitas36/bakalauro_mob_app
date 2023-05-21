import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'center',
    },
    card: {
      width: scale(250),
      maxWidth: scale(250),
      borderRadius: moderateScale(5),
      elevation: 5,
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
    usernameText: {
      textAlign: 'center',
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold'
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
    }
  });
};
