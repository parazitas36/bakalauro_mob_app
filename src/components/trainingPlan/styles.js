import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  infoView: {
    width: scale(280),
    flexDirection: 'row',
  },
  card: {
    width: scale(280),
    paddingVertical: verticalScale(20),
    gap: verticalScale(15),
    borderRadius: moderateScale(5),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: scale(10),
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  trainingPlanHeader: {
    fontSize: Resources.FontSize.heading2Text,
    color: Resources.Colors.TextColorWhite,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subView: {
    width: scale(140),
    flexDirection: 'column',
    paddingHorizontal: scale(5),
  },
  text: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.regularText,
  },
  boldText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.regularText*1.05,
    fontWeight: 'bold'
  },
});
