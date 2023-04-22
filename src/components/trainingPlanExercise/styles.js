import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  infoView: {
    height: verticalScale(100),
    width: scale(280),
    flexDirection: 'row',
  },
  card: {
    maxHeight: verticalScale(150),
    width: scale(280),
    borderRadius: moderateScale(5),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: scale(10),
    alignSelf: 'center',
  },
  exerciseHeader: {
    fontSize: Resources.FontSize.heading2Text,
    color: Resources.Colors.TextColorWhite,
    textAlign: 'center',
    textAlignVertical: 'center',
    minHeight: verticalScale(30),
    maxHeight: verticalScale(50),
  },
  subView: {
    width: scale(140),
    flexDirection: 'column',
    padding: scale(5),
  },
});
