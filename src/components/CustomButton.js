import { TouchableOpacity } from "react-native"
import { Text } from "react-native"

const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={props?.styles?.button}>
        <Text style={props?.styles?.btnText}>{props?.btnText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton