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
        alignItems: 'center',
        backgroundColor: Resources.Colors.BackgroundColorBlack,
    },
    text: {
        color: Resources.Colors.TextColorWhite,
        justifyContent: 'center',
        fontSize: Resources.FontSize.btnText,
    },
    details: {
        alignSelf: 'flex-start',
        paddingHorizontal: scale(20),
        margin: scale(5),
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.headingText,
        margin: scale(10),
        maxHeight: scale(300),
    },
    imageView: {
        height: verticalScale(180),
        width: scale(300),
        borderRadius: moderateScale(5),
        overflow: 'hidden',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        padding: 0,
        margin: 0
    }
})