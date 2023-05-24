import {View, Text} from 'react-native';
import React, {Suspense, useContext, useEffect, useState} from 'react';
import {LoadingScreen, UserContext} from '../../../App';
import styles from './styles';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import {FlatList} from 'react-native';
import { useTheme } from '@rneui/themed';
import GuideStep from '../../components/guideStep';

const Exercise = ({navigation, route}) => {
  const exerciseId = route?.params?.exerciseId;
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [data, setData] = useState(null);
  const [guideSteps, setGuideSteps] = useState(null);

  const {theme} = useTheme()

  useEffect(() => {
    setTimeout(() => {(async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants().Exercise_Endpoint}${exerciseId}`,
        token: token,
      });
      if (resp.status === 200) {
        const json = await resp.json();

        if (json.guide) {
          const guideJson = JSON.parse(json.guide);
          setGuideSteps(guideJson);
        }

        setData(json);
      } else {
        navigation.goBack();
      }
    })()
  }, 500)
  }, []);

  return (
    <Suspense fallback={LoadingScreen()}>
      {data === null ? LoadingScreen()
      : <View
          style={styles({theme}).view}>
          <Text style={styles({theme}).heading}>{data.name}</Text>
          {guideSteps !== null ? (
            <View>
              <FlatList
                data={guideSteps}
                renderItem={({item}) => <GuideStep data={item} token={token} theme={theme} />}
              />
            </View>
          ) : null}
        </View>}
    </Suspense>
  );
};

export default React.memo(Exercise);
