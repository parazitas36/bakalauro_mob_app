import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Resources from '../../Resources';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={props?.styles?.button}
      disabled={props?.disabled}>
      {props?.loading === true ? (
        <ActivityIndicator
          color={Resources.ActivityIndicatorLoadingScreen.color}
          size={props?.styles?.btnText.fontSize}
        />
      ) : (
        <Text style={props?.styles?.btnText}>{props?.btnText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
