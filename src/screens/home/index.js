import { useContext } from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import { UserContext } from '../../../App';

const Home = props => {
  const {roleSpecificDataState} = useContext(UserContext);
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'white'}}>Home</Text>
    </View>
  );
};

export default Home;
