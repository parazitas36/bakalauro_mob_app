import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  textInput: {
    color: 'black',
    width: scale(300),
    maxWidth: scale(300),
    height: verticalScale(150),
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.925)',
    borderRadius: moderateScale(10),
    verticalAlign: 'top',
    textAlignVertical: 'top',
    padding: scale(10),
  },
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.btnText,
  },
  button: {
    backgroundColor: Resources.Colors.BackgroundColorBlack,
    borderColor: Resources.Colors.BorderColorWhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    margin: scale(10),
    width: scale(100),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
