import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import Resources from '../../Resources';
import styles from './styles';

const Loading = (props) => {
  return (
    <Animated.View style={styles.view} entering={FadeInUp} exiting={FadeOutUp}>
      <ActivityIndicator
        color={Resources.ActivityIndicatorLoadingScreen.color}
        size={Resources.ActivityIndicatorLoadingScreen.size}
      />
      <Text style={styles.text}>{props?.text}</Text>
    </Animated.View>
  );
};

export default Loading;
