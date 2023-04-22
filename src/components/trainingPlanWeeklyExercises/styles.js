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
    marginTop: scale(10),
  },
  view: {
    width: scale(300),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  hiddenView: {
    height: 0,
    overflow: 'hidden'
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(5)
  },
  icon: {
    alignSelf: 'flex-end', 
    marginBottom: scale(2)
  },
});
