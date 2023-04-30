import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      paddingVertical: verticalScale(10),
      alignSelf: 'center',
    },
    equipmentText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.heading2Text,
      paddingVertical: verticalScale(5),
    },
    noEquipmentText: {
      fontSize: Resources.FontSize.regularText,
      color: theme.colors.black,
      justifyContent: 'center',
      alignItems: 'center',
    },
    instructionText: {
      color: theme.colors.black,
      fontSize: Resources.FontSize.regularText,
      maxWidth: scale(250),
      width: scale(250),
      textAlign: 'center',
      padding: moderateScale(2),
    },
  });
};
