import { View, Text, Image } from 'react-native'
import React, { Suspense, useContext } from 'react'
import { LoadingScreen, UserContext } from '../../../App';
import styles from './styles';
import EquipmentList from '../../components/equipmentList';
import { FAB } from '@rneui/base';
import Resources from '../../Resources';
import { ApiConstants } from '../../api/ApiConstants';
import { Tab, TabView, useTheme } from '@rneui/themed';
import { useState } from 'react';
import Trainers from '../trainers';

const Facility = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const facility = route?.params?.facility;
  const sportsClubName = route?.params?.sportsClubName;

  const [index, setIndex] = useState(0);
  
  const {theme} = useTheme();

  const params = {
    facilityId: facility.id
  }


  return (
    <Suspense fallback={LoadingScreen()}>
        <View style={styles({theme: theme}).view}>
          <View>
            <Text style={styles({theme: theme}).heading}>{sportsClubName} {Resources.Texts.Facility.toLowerCase()}</Text>
            <View style={styles({theme: theme}).imageView}>
            <Image
                  source={{
                    uri: `${ApiConstants().GetFile}${String(facility.imageUri)}`,
                    headers: {Authorization: `Bearer ${token}`},
                  }}
                  style={styles({theme: theme}).image}
                />
            </View>
            <View style={styles({theme: theme}).details}>
              <Text style={styles({theme: theme}).text}>{facility.country}, {facility.city}, {facility.coordinates}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
              <Tab value={index} onChange={(e) => setIndex(e)} style={{alignSelf: 'center'}}>
                <Tab.Item title='Equipment'/>
                <Tab.Item title='Trainers'/>
              </Tab>
              <TabView value={index} onChange={setIndex} animationType='spring'>
                <TabView.Item style={{flex: 1}}>
                  <EquipmentList facilityId={facility.id}/>
                </TabView.Item>
                <TabView.Item style={{flex: 1}}>
                  <Trainers navigation={navigation} route={{params: params}} />
                </TabView.Item>
              </TabView>
          </View>
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            color={theme.colors.primary}
            size='small'
            placement='right'
            onPress={() => navigation.navigate({name: Resources.Screens.EquipmentList, params: {facilityId: facility.id, editAmountMode: true}})}/>
        </View>
    </Suspense>
  )
}

export default Facility