import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
  card: {
    width: scale(250),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: moderateScale(15),
    marginHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(5)
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.subscriptionTitle,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    maxWidth: scale(220),
    width: scale(220),
    textAlign: 'center',
    padding: moderateScale(5),
  },
  detailsView: {
    paddingHorizontal: scale(15),
  },
  detailsScrollView: {
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
    borderRadius: moderateScale(10),
    margin: scale(10),
    width: scale(100),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
