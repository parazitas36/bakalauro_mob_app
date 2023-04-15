import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';

const CustomButtonWithIcon = props => {
  const hasIcon = props?.icon !== undefined && props?.icon !== null;
  const hasText = props?.btnText !== undefined && props?.btnText !== null;
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={props?.styles?.button}
      disabled={props?.disabled}>
        {hasIcon && props.icon()}
        {hasText && <Text style={props?.styles?.btnText}>{props?.btnText}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButtonWithIcon;
