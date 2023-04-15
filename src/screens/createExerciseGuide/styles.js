import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  text: {
    color: Resources.Colors.TextColorWhite,
  },
  addView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(5),
    padding: scale(10),
    marginBottom: verticalScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  box: {
    marginVertical: verticalScale(5),
  },
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: verticalScale(11),
  },
  button: {
    margin: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsWindow: {
    flexDirection: 'row',
    gap: moderateScale(30),
  },
  view: {
    flex: 1,
  },
  viewContainer: {
    alignItems: 'center'
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
    margin: scale(10),
  },
  countryButton: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.regularText,
    textDecorationLine: 'underline',
  },
});
