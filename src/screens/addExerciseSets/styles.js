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
    width: scale(250),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  view: {
    flex: 1,
  },
  contentContainerStyle: {
    alignItems: 'center',
    minHeight: '100%',
    gap: verticalScale(15),
    paddingBottom: verticalScale(20)
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
