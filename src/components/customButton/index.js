import { useTheme } from '@rneui/themed';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Resources from '../../Resources';

const CustomButton = props => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={props?.styles?.button}
      disabled={props?.disabled}>
      {props?.loading === true ? (
        <ActivityIndicator
          color={theme.colors.black}
          size={props?.styles?.btnText.fontSize}
        />
      ) : (
        <Text style={props?.styles?.btnText}>{props?.btnText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
