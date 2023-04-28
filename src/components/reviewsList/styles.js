import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    card: {
        width: scale(300),
        maxWidth: scale(300),
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: moderateScale(10),
        marginVertical: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(5),
    },
    view: {
        flex: 1,
        maxHeight: '60%',
        width: scale(300),
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: verticalScale(10),
        alignSelf: 'center',
    },
    reviewText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: Resources.FontSize.heading2Text,
        paddingVertical: verticalScale(5),
    },
    noReviewText: {
        fontSize: Resources.FontSize.regularText,
        color: Resources.Colors.TextColorWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameView: {
        width: '95%',
        flexDirection: 'row',
    },
    nameSubView: {
        width: '50%',
        padding: scale(5)
    },
    flexRow: {
        flexDirection: 'row',
    },
    reviewTextInCard: {
        color: Resources.Colors.TextColorWhite,
        fontSize: verticalScale(14),
        paddingVertical: verticalScale(5),
    },
    reviewView: {
        borderTopColor: Resources.Colors.BorderColorWhite,
        borderTopWidth: moderateScale(1),
        width: '95%',
        paddingHorizontal: scale(5),
    }
})