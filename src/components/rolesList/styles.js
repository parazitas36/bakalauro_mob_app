import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Resources from "../../Resources";

export default styles = StyleSheet.create({
    text: {
        color: Resources.Colors.TextColorWhite,
    },
    box: {
        marginVertical: scale(5),
    }
})