import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    card: {
        width: scale(250),
        maxWidth: scale(200),
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: moderateScale(10),
        marginVertical: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    equipmentView: {
        minHeight: verticalScale(50),
        maxHeight: verticalScale(60),
        width: scale(200),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    heading: {
        color: Resources.Colors.TextColorWhite,
        fontSize: verticalScale(14),
    },
    descriptionView: {
        justifyContent: 'center',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        alignSelf: 'flex-start',
    },
    descriptionText: {
        color: Resources.Colors.TextColorWhite,
        fontSize: verticalScale(10),
    },
})