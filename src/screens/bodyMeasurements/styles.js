import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
  return (
    StyleSheet.create({
      view: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: verticalScale(10),
      },
      flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(5),
        marginVertical: verticalScale(5),
      },
      title: {
        color: theme.colors.black,
        fontSize: Resources.FontSize.heading4Text,
        fontWeight: 'bold',
      },
      card: {
        borderRadius: moderateScale(5),
        width: scale(250),
        maxWidth: scale(250),
        elevation: 5,
      },
      flexRowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      },
      column: {
        margin: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        fontSize: Resources.FontSize.regularText
      },
      boldText: {
        fontSize: Resources.FontSize.regularText,
        fontWeight: 'bold'
      }
    })
  )
} ;
