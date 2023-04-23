import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  text: {
    color: Resources.Colors.TextColorWhite,
  },
  heading: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.heading2Text,
    margin: scale(10),
  },
  view: {
    height: verticalScale(100),
    width: scale(300),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    borderColor: Resources.Colors.BorderColorWhite,
    flexDirection: 'row',
    marginTop: verticalScale(15)
  },
  subView: {
    width: scale(150),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
