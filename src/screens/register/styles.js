import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    scrollView: {
        minHeight: '100%',
        paddingVertical: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textInput: {
        color: Resources.Colors.TextColorWhite,
        borderTopWidth: scale(0),
        borderLeftWidth: scale(0),
        borderRightWidth: scale(0),
        borderBottomWidth: scale(1),
        borderColor: Resources.Colors.BorderColorWhite,
        width: scale(250),
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateScale(5),
    },
    dividedTextInput: {
        color: Resources.Colors.TextColorWhite,
        borderTopWidth: scale(0),
        borderLeftWidth: scale(0),
        borderRightWidth: scale(0),
        borderBottomWidth: scale(1),
        borderColor: Resources.Colors.BorderColorWhite,
        marginBottom: moderateScale(5),
        width: scale(120),
        textAlign: 'center',
    },
    dividedView: {
        width: scale(265),
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
        gap: scale(10),
    },
    partOfDividedView: {
        flexDirection: 'column',
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.headingText,
        margin: scale(10)
    },
    btnText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.btnText,
    },
    button: {
        padding: moderateScale(10),
        borderColor: Resources.Colors.BorderColorWhite,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        margin: scale(10),
        marginTop: 20,
        width: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    errors: {
        color: Resources.Colors.ErrorTextColor,
        fontSize: Resources.FontSize.validationText,
        alignSelf: 'center',
    },
    errorsFlexStart: {
        color: Resources.Colors.ErrorTextColor,
        fontSize: Resources.FontSize.validationText,
        alignSelf: 'flex-start',
        paddingLeft: scale(28),
    }
})