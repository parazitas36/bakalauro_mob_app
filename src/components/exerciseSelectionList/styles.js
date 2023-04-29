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
      height: verticalScale(200),
    },
    text: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
    },
    boldText: {
        color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
        fontWeight: 'bold'
    },
    searchText: {
      color: theme.colors.black,
      paddingHorizontal: scale(7),
      width: '100%',
    },
    infoView: {
      height: verticalScale(100),
      maxHeight: verticalScale(100),
      width: scale(250),
      flexDirection: 'row',
    },
    card: {
      maxHeight: verticalScale(150),
      width: scale(250),
      borderRadius: moderateScale(5),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      marginHorizontal: scale(10),
      alignSelf: 'center',
    },
    exerciseHeader: {
      fontSize: Resources.FontSize.heading2Text,
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      textAlign: 'center',
      textAlignVertical: 'center',
      minHeight: verticalScale(30),
      maxHeight: verticalScale(50),
    },
    subView: {
      width: scale(125),
      flexDirection: 'column',
      padding: scale(5),
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
