import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      width: scale(280),
      borderRadius: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(10),
      backgroundColor: theme.mode === 'dark' ? theme.colors.grey4 : theme.colors.grey2,
      gap: verticalScale(5),
      marginVertical: verticalScale(5),
    },
    header: {
      color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
      fontSize: Resources.FontSize.heading2Text,
      justifyContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
      textAlignVertical: 'center',
    },
    infoView: {
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(5),
      alignItems: 'flex-start',
    },
    text: {
        color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
        fontSize: Resources.FontSize.regularText
    }
  });
};
