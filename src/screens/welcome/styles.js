import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    btnText: {
        color: Resources.Colors.TextColorWhite,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: scale(12),
    },
    button: {

    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Resources.Colors.BackgroundColorBlack,
    },
    text: {
        color: Resources.Colors.TextColorWhite,
        justifyContent: 'center',
        fontSize: scale(12)
    },
    horizontalFlex: {
        flexDirection: 'row',
        gap: scale(5),
        margin: scale(5),
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: scale(30),
        margin: scale(10)
    },
})