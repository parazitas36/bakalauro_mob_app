import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    card: {
        width: scale(250),
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: moderateScale(10),
        marginVertical: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: verticalScale(10),
        alignSelf: 'center',
    },
    equipmentText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.heading2Text,
        paddingVertical: verticalScale(5),
    },
    contactsView: {
        justifyContent: 'center',
        minHeight: verticalScale(40),
        maxHeight: verticalScale(100),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        alignSelf: 'flex-start',
    },
    contactsText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: verticalScale(10),
    },
    noEquipmentText: {
        fontSize: Resources.FontSize.regularText,
        color: Resources.Colors.TextColorWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.regularText,
        borderTopWidth: 1,
        borderTopColor: 'white',
        maxWidth: scale(230),
        width: scale(230),
        textAlign: 'center',
        padding: moderateScale(2)
    },
})