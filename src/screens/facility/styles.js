import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    btnText: {
        color: Resources.Colors.TextColorWhite,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: Resources.FontSize.btnText,
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
        fontSize: Resources.FontSize.btnText,
    },
    horizontalFlex: {
        flexDirection: 'row',
        gap: scale(5),
        margin: scale(5),
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.headingText,
        margin: scale(10),
        marginTop: scale(0)
    },
    image: {
        width: scale(50),
        height: scale(30),
        padding: 0,
        margin: 0
    }
})