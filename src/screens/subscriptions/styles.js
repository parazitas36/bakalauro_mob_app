import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  text: {
    color: Resources.Colors.TextColorWhite,
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
    height: verticalScale(30),
    width: scale(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    color: Resources.Colors.TextColorWhite,
    borderTopWidth: scale(0),
    borderLeftWidth: scale(0),
    borderRightWidth: scale(0),
    borderBottomWidth: scale(1),
    borderColor: Resources.Colors.BorderColorWhite,
    width: scale(250),
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(5),
  },
  errors: {
    color: Resources.Colors.ErrorTextColor,
    fontSize: Resources.FontSize.validationText,
    paddingLeft: scale(5),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(5),
  },
  heading: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.headingText,
    marginBottom: verticalScale(10)
  },
  subscriptionsScrollView: {
    maxHeight: verticalScale(200),
  },
  subscriptionsScrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
