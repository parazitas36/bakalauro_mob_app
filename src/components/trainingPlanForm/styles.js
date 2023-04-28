import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    view: {
        width: scale(280),
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        gap: verticalScale(5),
        marginVertical: verticalScale(5)
    },
    header: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.heading2Text,
        justifyContent: 'center',
        alignSelf: 'center',
        verticalAlign: 'middle',
        textAlignVertical: 'center',
    },
    infoView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subView: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: verticalScale(5)
    },
    boldText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        fontSize: Resources.FontSize.regularText,
        width: scale(50),
        height: scale(30),
        color: Resources.Colors.TextColorWhite,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: moderateScale(3)
    },
    button: {
        borderColor: Resources.Colors.BorderColorWhite,
        borderWidth: moderateScale(1),
        backgroundColor: Resources.Colors.BackgroundColorBlack,
        width: scale(90),
        height: verticalScale(30),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText
    }
})