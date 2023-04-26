import { View, Text, Image } from 'react-native'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { LoadingScreen, UserContext } from '../../../App';
import styles from './styles';
import Resources from '../../Resources';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { ApiConstants } from '../../api/ApiConstants';
import { GetCall } from '../../api/GetCall';
import { FlatList } from 'react-native';
import Video from 'react-native-video';

const Exercise = ({navigation, route}) => {
  const exerciseId = route?.params?.exerciseId;
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [data, setData] = useState(null);
  const [guideSteps, setGuideSteps] = useState(null)

  const GuideStep = (data) => {
    if(data.Type === Resources.BlockType.Image){
      return(<View style={styles.guideBlock}>
        <Image 
          source={{
            uri: `${ApiConstants().Exercise_Endpoint}file/${String(data.Content)}`, 
            headers: {'Authorization': `Bearer ${token}`},
          }} 
          style={{height: '100%', width: '100%'}}
          resizeMode='contain'/>
      </View>)
    }
    if(data.Type === Resources.BlockType.Text){
      return(<View style={styles.guideBlock}>
        <Text style={styles.text}>{data.Content}</Text>
      </View>)
    }
    if(data.Type === Resources.BlockType.Video){
      return(<View style={styles.guideBlock}>
        <Video
          source={{
            uri: `${ApiConstants().Exercise_Endpoint}file/${String(data.Content)}`, 
            headers: {'Authorization': `Bearer ${token}`},
          }}
          style={{height: '100%', width: '100%'}}
          resizeMode='cover'
          paused={false}
          controls={true}
        />
      </View>)
    }
  }

  useEffect(() => {
    (async() => {
      const resp = await GetCall({endpoint: `${ApiConstants().Exercise_Endpoint}${exerciseId}`, token: token})
      if(resp.status === 200){
        const json = await resp.json();

        if (json.guide) {
          const guideJson = JSON.parse(json.guide);
          setGuideSteps(guideJson)
        }

        setData(json)
      } else {
        navigation.goBack();
      }
    })()
  }, [])

  return (
    <Suspense fallback={LoadingScreen()}>
        {data === null ? LoadingScreen() :
        <Animated.View
          style={styles.view}
          entering={FadeInDown}
          exiting={FadeOutUp}>
            <Text style={styles.heading}>{data.name}</Text>
            {guideSteps !== null ? <View>
              <FlatList data={guideSteps} renderItem={({item}) => GuideStep(item)}/>
            </View> : null}
        </Animated.View>}
    </Suspense>
  )
}

export default Exercise