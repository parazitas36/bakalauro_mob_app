import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    card: {
        width: scale(250),
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: moderateScale(15),
        marginHorizontal: scale(10)
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: verticalScale(45),
    },
    titleText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.subscriptionTitle,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        maxWidth: scale(220),
        width: scale(220),
        textAlign: 'center',
        padding: moderateScale(5)
    },
    detailsView: {
        paddingHorizontal: scale(15),
    },
    detailsScrollView: {
        height: verticalScale(100),
        maxHeight: verticalScale(100),
    },
    detailsText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText,
    },
    priceView: {
        height: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText,
        borderTopWidth: 1,
        borderTopColor: 'white',
        maxWidth: scale(220),
        width: scale(220),
        textAlign: 'center',
        paddingTop: moderateScale(5),
    },
})