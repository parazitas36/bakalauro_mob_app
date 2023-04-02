import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import Resources from '../../Resources';
import styles from './styles';

const Loading = (props) => {
  return (
    <Animated.View style={styles.view} entering={FadeInLeft} exiting={FadeOutRight}>
      <ActivityIndicator
        color={Resources.ActivityIndicatorLoadingScreen.color}
        size={Resources.ActivityIndicatorLoadingScreen.size}
      />
      <Text style={styles.text}>{props?.text ?? Resources.ActivityIndicatorLoadingScreen.Texts.Loading}</Text>
    </Animated.View>
  );
};

export default Loading;
