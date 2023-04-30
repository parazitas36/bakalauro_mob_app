import { useTheme } from '@rneui/themed';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import Resources from '../../Resources';
import styles from './styles';

const Loading = (props) => {

  const {theme} = useTheme();

  return (
    <Animated.View style={styles({theme: theme}).view} entering={FadeInLeft} exiting={FadeOutRight}>
      <ActivityIndicator
        color={theme.colors.black}
        size={Resources.ActivityIndicatorLoadingScreen.size}
      />
      <Text style={styles({theme: theme}).text}>{props?.text ?? Resources.ActivityIndicatorLoadingScreen.Texts.Loading}</Text>
    </Animated.View>
  );
};

export default Loading;
