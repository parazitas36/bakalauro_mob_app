import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: Resources.Colors.BackgroundColorBlack,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.btnText,
        maxWidth: scale(300),
        width: scale(300),
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.headingText,
        margin: scale(10),
        maxWidth: scale(300),
        maxHeight: scale(300),
    },
})