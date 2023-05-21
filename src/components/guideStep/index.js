import {View, Text, Image} from 'react-native';
import React, { useState} from 'react';
import styles from './styles';
import Resources from '../../Resources';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import Video from 'react-native-video';
import { useRef } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { useEffect } from 'react';

const GuideStep = ({data, theme, token}) => {
  const [paused, setPaused] = useState(true)
  const player = useRef(null);

  const [imageDimensions, setImageDimensions] = useState(null)

  useEffect(() => {
    if (data.Type === Resources.BlockType.Image) {
        Image.getSizeWithHeaders(
            `${ApiConstants().GetFile}${String(data.Content)}`, 
            {'Authorization': `Bearer ${token}`}, 
            (width, height) => setImageDimensions({width: width, height: height})
        );
    }
}, [])

  if (data.Type === Resources.BlockType.Image) {
    return (
      <View style={styles({theme}).guideBlock}>
        <Image
          source={{
            uri: `${ApiConstants().GetFile}${String(data.Content)}`,
            headers: {Authorization: `Bearer ${token}`},
          }}
          style={imageDimensions !== null ? 
            imageDimensions.width > imageDimensions.height ? 
                styles({theme: theme}).wideImage : styles({theme: theme}).longImage
          : {} }
        />
      </View>
    );
  }
  if (data.Type === Resources.BlockType.Text) {
    return (
      <View style={styles({theme}).guideBlock}>
        <Text style={styles({theme}).text}>{data.Content}</Text>
      </View>
    );
  }
  if (data.Type === Resources.BlockType.Video) {
    console.log(data.Content)
    return (
      <View style={styles({theme}).guideBlock}>
        <Video
          source={{
            uri: `${ApiConstants().GetFile}${String(data.Content)}`,
            type: 'mp4',
            headers: {Authorization: `bearer ${token}`},
          }}
          ref={player}
          style={imageDimensions !== null ? 
            imageDimensions.width > imageDimensions.height ? 
                styles({theme: theme}).wideVideo : styles({theme: theme}).longVideo
          : styles({theme: theme}).wideVideo }
          resizeMode='contain'
          paused={paused}
          onTouchStart={() => setPaused(prev => !prev)}
          onError={(x) => console.log(x)}
          onLoad={({naturalSize}) => {
            player.current.seek(0)
          }}
        />
      </View>
    );
  }

  return null;
};
export default React.memo(GuideStep);
