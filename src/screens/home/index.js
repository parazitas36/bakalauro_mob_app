import {Suspense, useContext} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import {LoadingScreen, UserContext} from '../../../App';
import styles from './styles';

const Home = props => {
  const {roleSpecificDataState} = useContext(UserContext);
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  return (
    <Suspense fallback={LoadingScreen()}>
      <View style={styles.view}>
        <Text style={styles.text}>Home</Text>
      </View>
    </Suspense>
  );
};

export default Home;
