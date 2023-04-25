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
    maxHeight: verticalScale(45),
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
    height: verticalScale(100),
    maxHeight: verticalScale(100),
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
  flexRow: {
    flexDirection: 'row'
  },
  sportsClubView: {
    width: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(150),
    borderWidth: moderateScale(1),
    borderColor: Resources.Colors.BorderColorWhite,
    borderRadius: moderateScale(10),
    gap: verticalScale(5),
    marginVertical: verticalScale(5),
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(10)
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoView: {
    width: scale(170),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: scale(10)
  },
  heading: {
    color: Resources.Colors.TextColorWhite,
    fontSize: Resources.FontSize.heading2Text,
    paddingHorizontal: scale(5),
    textAlign: 'center',
  }
});
