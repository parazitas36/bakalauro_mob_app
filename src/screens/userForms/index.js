import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Resources from '../../Resources';
import {scale} from 'react-native-size-matters';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {Suspense} from 'react';
import {LoadingScreen, UserContext} from '../../../App';
import {useEffect} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {FAB} from '@rneui/themed';
import TrainingPlanForm from '../../components/trainingPlanForm';

const UserForms = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} =
    useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [userForms, setUserForms] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants().UsersTrainingPlanForms,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setUserForms(data);
      } else {
        setUserForms([]);
      }
    })();
  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
      {userForms === null ? LoadingScreen() : 
        <Animated.View entering={FadeInLeft} style={styles.view}>
          <Text style={styles.btnText}>My forms</Text>
          {userForms?.length === 0 ? (
            <Text style={styles.btnText}>No forms</Text>
          ) : userForms?.map((item, index) => {
            return <TrainingPlanForm key={index} data={item} />
          })}
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            color="#2089DC"
            size="small"
            placement="right"
            onPress={() => navigation.navigate('CreateTrainingPlanForm')}
          />
        </Animated.View>
      }
    </Suspense>
  );
};

export default UserForms;
