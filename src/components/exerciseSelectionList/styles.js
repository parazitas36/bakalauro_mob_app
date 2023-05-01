import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      width: scale(300),
      borderColor: 'white',
      borderRadius: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: verticalScale(5),
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.black,
      borderWidth: moderateScale(2),
    },
    text: {
      fontSize: Resources.FontSize.regularText
    },
    boldText: {
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold'
    },
    searchText: {
      color: theme.colors.black,
      paddingHorizontal: scale(7),
      width: '100%',
    },
    infoView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    card: {
      width: scale(250),
      maxWidth: scale(250),
      borderRadius: moderateScale(5),
    },
    exerciseHeader: {
      fontSize: Resources.FontSize.heading2Text,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    subView: {
      width: '50%',
      flexDirection: 'column',
    },
    searchView: {
      width: scale(280),
      height: verticalScale(35),
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
