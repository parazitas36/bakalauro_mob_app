import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.btnText,
    paddingHorizontal: scale(5),
    textAlign: 'center'
  },
  button: {
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: scale(10),
    width: scale(120),
    height: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(5)
  },
  view: {
    flex: 1,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row'
  }
});
