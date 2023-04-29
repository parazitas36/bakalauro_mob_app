import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Resources from '../../Resources';

export default styles = ({theme}) => {
    return (
        StyleSheet.create({
            block: {
                flexDirection: 'row',
                maxWidth: scale(350),
                justifyContent: 'center',
                alignItems: 'center',
            },
            card: {
                width: scale(200),
                minHeight: scale(100),
                maxHeight: scale(200),
                borderRadius: moderateScale(10),
                marginVertical: scale(10),
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            },
            arrowView: {
                width: scale(50),
                gap: 20,
            },
            blockBtnView: {
                width: scale(50),
            },
            text: {
                color: theme.colors.black,
                fontSize: Resources.FontSize.regularText,
                verticalAlign: 'top',
                textAlignVertical: 'top',
                textAlign: 'left',
                minHeight: scale(100),
                width: '100%',
                borderColor: theme.colors.greyOutline,
                borderRadius: moderateScale(10),
                borderWidth: 1,
                padding: moderateScale(10),
            },
            button: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            image: {
                width: '100%',
                height: '100%',
            },
        })
    )
} 