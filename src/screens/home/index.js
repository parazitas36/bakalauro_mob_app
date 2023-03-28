import { useContext } from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import { UserContext } from '../../../App';
import styles from './styles';

const Home = props => {
  const {roleSpecificDataState} = useContext(UserContext);
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
