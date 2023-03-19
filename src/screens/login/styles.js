import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default styles = StyleSheet.create({
    btnText: {
        color: 'white'
    },
    button: {
        padding: moderateScale(10),
        borderColor: 'white',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        margin: scale(10),
        marginTop: 20,
        width: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    usernameInput: {
        color: 'white',
        borderTopWidth: scale(0),
        borderLeftWidth: scale(0),
        borderRightWidth: scale(0),
        borderBottomWidth: scale(1),
        borderColor: 'white',
        width: scale(200),
        paddingHorizontal: moderateScale(10),
    },
    passwordInput: {
        color: 'white',
        borderTopWidth: scale(0),
        borderLeftWidth: scale(0),
        borderRightWidth: scale(0),
        borderBottomWidth: scale(1),
        borderColor: 'white',
        width: scale(200),
        paddingHorizontal: moderateScale(10),
    },
    placeholder: {
        color: 'grey',
    }
})