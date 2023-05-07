import {Card, FAB, Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import { Image, View } from 'react-native';
import {FlatList} from 'react-native';
import {Animated} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {GetCall} from '../../api/GetCall';
import Resources from '../../Resources';
import styles from './styles';


const BodyMeasurementsItem = ({data, theme}) => {
    const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
    const [token, setToken] = tokenState;
    const [userData, setUserData] = userDataState;
    const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

    const [imageDimensions, setImageDimensions] = useState(null)

    const date = new Date(String(data.measurementDay))
    
    useEffect(() => {
        if (data?.imageUri !== null) {
            Image.getSizeWithHeaders(
                `${ApiConstants().Exercise_Endpoint}file/${String(data?.imageUri)}`, 
                {'Authorization': `Bearer ${token}`}, 
                (width, height) => setImageDimensions({width: width, height: height})
            );
        }
    }, [])

    return (
      <Card containerStyle={styles({theme: theme}).card}>
        <View style={styles({theme: theme}).flexRow}>
            <Icon type='font-awesome' name='calendar' size={verticalScale(18)}/>
            <Text style={styles({theme: theme}).title}>{date.toLocaleDateString()}</Text>
        </View>
        <Card.Divider />
        <View style={styles({theme: theme}).flexRowWrap}>
            <View style={styles({theme: theme}).column}>
                <Text style={styles({theme: theme}).boldText}>Height</Text>
                <Text>{data?.height} cm</Text>
            </View>
            <View style={styles({theme: theme}).column}>
                <Text style={styles({theme: theme}).boldText}>Weight</Text>
                <Text>{data?.weight} kg</Text>
            </View>
        </View>
        {(data?.chest !== null || data?.waist !== null || data?.hips !== null || data?.shoulders !== null) && <Card.Divider />}
        <View style={styles({theme: theme}).flexRowWrap}>
            {data?.chest !== null && <View style={styles({theme: theme}).column}>
                <Text style={styles({theme: theme}).boldText}>Chest</Text>
                <Text>{data?.chest} cm</Text>
            </View>}
            {data?.waist !== null && <View style={styles({theme: theme}).column}>
                <Text style={styles({theme: theme}).boldText}>Waist</Text>
                <Text>{data?.waist} cm</Text>
            </View>}
            {data?.hips !== null && <View style={styles({theme: theme}).column}>
                <Text style={styles({theme: theme}).boldText}>Hips</Text>
                <Text>{data?.hips} cm</Text>
            </View>}
            {data?.shoulders !== null && <View style={styles({theme: theme}).column}>
                <Text style={styles({theme: theme}).boldText}>Shoulders</Text>
                <Text>{data?.shoulders} cm</Text>
            </View>}
        </View>
        {data?.imageUri !== null && <Card.Divider />}
        {data?.imageUri !== null &&
        <Card.Image
            source={{
                uri: `${ApiConstants().Exercise_Endpoint}file/${String(data?.imageUri)}`,
                headers: {Authorization: `Bearer ${token}`},
            }}
            style={imageDimensions !== null ? 
                imageDimensions.width > imageDimensions.height ? 
                    styles({theme: theme}).wideImage : styles({theme: theme}).longImage
            : {} }
            containerStyle={{alignSelf: 'center'}}
        />}
      </Card>
    );
  };

  export default BodyMeasurementsItem;