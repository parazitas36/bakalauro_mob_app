import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      width: scale(280),
      borderRadius: moderateScale(5),
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
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    subView: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: verticalScale(5),
    },
    boldText: {
      fontSize: Resources.FontSize.regularText,
      fontWeight: 'bold',
    },
  });
};
