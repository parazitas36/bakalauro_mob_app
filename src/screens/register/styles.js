import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        margin: moderateScale(5),
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: scale(30),
        margin: scale(10)
    },
    btnText: {
        color: Resources.Colors.TextColorWhite
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
})