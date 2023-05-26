import { Text, useTheme } from '@rneui/themed';
import {useContext} from 'react';
import { Suspense } from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import { RefreshControl } from 'react-native';
import {FlatList} from 'react-native';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import {LoadingScreen, UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import Invite from '../invite';

const TrainerInvites = ({navigation, token, theme}) => {
  const [invites, setInvites] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: ApiConstants().TrainerInvites,
        token: token,
      });
      if (resp.status === 200) {
        const data = await resp.json();
        
        setInvites(data);
      } else {
        setInvites([])
      }

      setReload(false);
    })();
  }, [reload === true]);

  return (
      <Animated.View
        entering={FadeInLeft.delay(300)}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {invites === null ? LoadingScreen()
          : invites?.length > 0 ? 
          <FlatList
            refreshControl={<RefreshControl onRefresh={() => setReload(true)} refreshing={reload === true}/>}
            style={{minWidth: '100%'}} 
            contentContainerStyle={{alignItems: 'center'}} 
            data={invites} 
            renderItem={({item, index}) => {
              return <Invite navigation={navigation} token={token} data={item} key={index} theme={theme} reload={reload} setReload={setReload} />
            }}
          />
          : <Text>You have no invites</Text>}
      </Animated.View>
  );
};

export default TrainerInvites;
