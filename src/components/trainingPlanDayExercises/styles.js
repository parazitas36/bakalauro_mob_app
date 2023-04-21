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
    width: scale(300),
    flexDirection: 'column',
  },
  dayText: {
    fontSize: Resources.FontSize.heading2Text,
    width: scale(300),
    color: Resources.Colors.TextColorWhite,
    borderBottomColor: Resources.Colors.BorderColorWhite,
    borderBottomWidth: 1,
    height: verticalScale(30)
  },
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.btnText,
  },
  button: {
    borderColor: Resources.Colors.BorderColorWhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    margin: scale(10),
    width: scale(150),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  hidden: {
    height: 0,
    overflow: 'hidden'
  },

});
