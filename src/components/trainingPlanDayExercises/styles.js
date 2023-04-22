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
  dayTextView: {
    width: scale(300),
    borderBottomColor: Resources.Colors.BorderColorWhite,
    borderBottomWidth: 1,
    height: verticalScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '50%',
    alignItems: 'flex-end',
    paddingRight: scale(5)
  },
  dayText: {
    left: 0,
    fontSize: Resources.FontSize.heading2Text,
    color: Resources.Colors.TextColorWhite,
    width: '50%'
  },
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.btnText,
  },
  button: {
    borderColor: Resources.Colors.BorderColorWhite,
    borderWidth: moderateScale(1.25),
    borderRadius: moderateScale(10),
    borderStyle: 'dashed',
    margin: scale(10),
    width: scale(100),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  hidden: {
    height: 0,
    overflow: 'hidden'
  },

});
