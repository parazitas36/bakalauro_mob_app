import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  text: {
    color: Resources.Colors.TextColorWhite,
  },
  box: {
    marginVertical: verticalScale(5),
  },
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.btnText,
  },
  button: {
    borderColor: Resources.Colors.BorderColorWhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    marginVertical: scale(10),
    width: scale(135),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
  },
  viewContent: {
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
    textAlign: 'center',
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
    fontSize: Resources.FontSize.heading2Text,
    margin: scale(10),
  },
  radioButtons: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.regularText,
  },
  flexRow: {
    flexDirection: 'row',
    gap: scale(30)
  }
});
