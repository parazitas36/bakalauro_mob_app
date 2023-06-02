import {View, Text, Image} from 'react-native';
import React, { useState} from 'react';
import styles from './styles';
import Resources from '../../Resources';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import Video from 'react-native-video';
import { useRef } from 'react';
import { scale, moderateScale } from 'react-native-size-matters';
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
    const ratio = () => imageDimensions?.height / imageDimensions?.width
    return (
      <View style={styles({theme}).guideBlock}>
        <Image
          source={{
            uri: `${ApiConstants().GetFile}${String(data.Content)}`,
            headers: {Authorization: `Bearer ${token}`},
          }}
          style={imageDimensions !== null ? 
            imageDimensions.width > imageDimensions.height ? 
                { 
                  padding: 0, 
                  margin: 0,
                  width: scale(300), 
                  height: scale(300 * ratio()),
                  borderRadius: moderateScale(5)
                } 
                : 
                {
                  padding: 0, 
                  margin: 0,
                  width: scale(250), 
                  height: scale(250 * ratio()),
                  borderRadius: moderateScale(5)
                }
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
    const ratio = () => imageDimensions?.height / imageDimensions?.width
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
                { 
                  padding: 0, 
                  margin: 0,
                  width: scale(300), 
                  height: scale(300 * ratio()),
                  borderRadius: moderateScale(5)
                } 
                : 
                {
                  padding: 0, 
                  margin: 0,
                  width: scale(250), 
                  height: scale(250 * ratio()),
                  borderRadius: moderateScale(5)
                }
          : {} }
          resizeMode='contain'
          paused={paused}
          onTouchStart={() => setPaused(prev => !prev)}
          onLoad={({naturalSize}) => {
            setImageDimensions({width: naturalSize.width, height: naturalSize.height, orientation: naturalSize.orientation})
            player.current.seek(0)
          }}
        />
      </View>
    );
  }

  return null;
};
export default GuideStep;
