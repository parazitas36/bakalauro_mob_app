import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default styles = StyleSheet.create({
    btnText: {
        color: 'white',
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
        backgroundColor: 'black',
        color: 'white',
    },
    text: {
        color: 'white',
        justifyContent: 'center',
        fontSize: scale(12)
    },
    horizontalFlex: {
        flexDirection: 'row',
        gap: scale(10),
        margin: scale(5),
    },
    heading: {
        color: 'white',
        fontSize: scale(30),
        margin: scale(10)
    }
})