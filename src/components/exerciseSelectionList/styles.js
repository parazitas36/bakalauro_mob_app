import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = StyleSheet.create({
    view: {
        width: scale(300),
        borderColor: 'white',
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: verticalScale(5),
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        borderWidth: moderateScale(1),
        height: verticalScale(200),
    },
    searchText: {
        color: 'white',
        paddingHorizontal: scale(7),
        width: '100%'
    },
    infoView: {
        height: verticalScale(100),
        maxHeight: verticalScale(100),
        width: scale(250),
        flexDirection: 'row',
    },
    card: {
        maxHeight: verticalScale(150),
        width: scale(250),
        borderRadius: moderateScale(5),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginHorizontal: scale(10),
        alignSelf: 'center'
    },
    exerciseHeader: {
        fontSize: Resources.FontSize.heading2Text,
        color: Resources.Colors.TextColorWhite,
        textAlign: 'center',
        textAlignVertical: 'center',
        minHeight: verticalScale(30),
        maxHeight: verticalScale(50),
    },
    subView: {
        width: scale(125),
        flexDirection: 'column',
        padding: scale(5),
    },
    searchView: {
        width: scale(280),
        height: verticalScale(35),
        borderBottomColor: 'rgba(255, 255, 255, 0.25)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})