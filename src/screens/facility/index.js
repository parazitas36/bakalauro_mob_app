import { View, Text, Image } from 'react-native'
import React, { Suspense, useContext } from 'react'
import { LoadingScreen, UserContext } from '../../../App';
import styles from './styles';
import EquipmentList from '../../components/equipmentList';
import { FAB } from '@rneui/base';
import Resources from '../../Resources';
import { ApiConstants } from '../../api/ApiConstants';
import { SpeedDial, Tab, TabView, useTheme } from '@rneui/themed';
import { useState } from 'react';
import Trainers from '../trainers';

const Facility = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [userData, setUserData] = userDataState
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState
  const [token, setToken] = tokenState;
  const [sdialIsOpen, setSDialIsOpen] = useState(false);
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
              <Text style={styles({theme: theme}).text}>{facility.country}, {facility.city}, {facility.address}</Text>
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
          {userData.role === 'SportsClubAdmin' &&
            <SpeedDial
              overlayColor={sdialIsOpen ? '' : 'transparent'}
              isOpen={sdialIsOpen}
              icon={{name: 'angle-up', type:'font-awesome-5', color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white}}
              openIcon={{name: 'close', color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white}}
              onOpen={() => setSDialIsOpen(true)}
              onClose={() => setSDialIsOpen(false)}
            >
              <SpeedDial.Action
                icon={{name: 'person', type:'fontAwesome', color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white}}
                title='Assign trainer'
                onPress={() => navigation.navigate({name: 'Trainers', params: {sportsClubId: roleSpecificData.id, facilityId: facility.id, assignable: true}})}
              />
              <SpeedDial.Action
                icon={{name: 'add', color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white}}
                title='Add equipment'
                onPress={() => navigation.navigate({name: Resources.Screens.EquipmentList, params: {facilityId: facility.id, editAmountMode: true}})}
              />
            </SpeedDial>}
        </View>
    </Suspense>
  )
}

export default Facility