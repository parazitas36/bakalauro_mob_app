import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Resources from "../../Resources";

export default styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Resources.Colors.TextColorWhite,
    }
})