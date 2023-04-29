import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  card: {
    width: scale(250),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: moderateScale(10),
    marginHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(10)
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: verticalScale(45),
  },
  titleText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.subscriptionTitle,
    maxWidth: scale(220),
    width: scale(220),
    textAlign: 'center',
    padding: moderateScale(5),
  },
  detailsView: {
    paddingHorizontal: scale(15),
    width: '100%',
    paddingVertical: verticalScale(10)
  },
  detailsText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.regularText,
  },
  btnText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.btnText,
  },
  button: {
    backgroundColor: Resources.Colors.BackgroundColorBlack,
    borderColor: Resources.Colors.BorderColorWhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    margin: scale(10),
    width: '90%',
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
