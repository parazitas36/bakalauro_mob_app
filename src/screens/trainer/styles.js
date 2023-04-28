import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    btnText: {
        color: Resources.Colors.TextColorWhite,
        fontWeight: 'bold',
        fontSize: Resources.FontSize.btnText,
    },
    button: {
        borderColor: Resources.Colors.BorderColorWhite,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        margin: verticalScale(5),
        width: scale(250),
        height: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Resources.Colors.BackgroundColorBlack,
    },
    subView: {
        width: '50%',
    },
    text: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.btnText,
    },
    boldText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.btnText,
        fontWeight: 'bold'
    },
    details: {
        alignSelf: 'center',
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
    imageView: {
        height: verticalScale(160),
        width: scale(300),
        borderRadius: moderateScale(5),
        overflow: 'hidden',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        padding: 0,
        margin: 0
    },
    reviewView: {
        width: scale(300),
        borderRadius: moderateScale(10),
        padding: moderateScale(10),
        gap: moderateScale(10)
    },
    flexRow: {
        flexDirection: 'row',
        paddingHorizontal: scale(5),
        gap: moderateScale(3),
        alignItems: 'center'
    },
    ratingText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: verticalScale(15),
    },
    reviewText: {
        backgroundColor: 'rgba(255, 255, 255, 0.025)',
        color: Resources.Colors.TextColorWhite,
        borderRadius: moderateScale(5),
        padding: scale(10),
        textAlignVertical: 'top'
    }
})