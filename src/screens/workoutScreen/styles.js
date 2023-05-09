import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    viewContainer: {
      alignItems: 'center',
      paddingBottom: scale(130),
    },
    flexRow: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 5,
    },
    cardButtons: {
      width: scale(150),
      height: scale(80),
      borderRadius: moderateScale(5),
      opacity: 0.9,
      alignItems: 'center'
    },
    mainView: {
      flex: 1,
      alignItems: 'center'
    },
    exerciseTitleCard: {
      height: '100%',
      fontWeight: 'bold'
    }
  });
};
