import { View, Text, Image } from 'react-native'
import React, { Suspense } from 'react'
import { LoadingScreen } from '../../../App';
import styles from './styles';
import EquipmentList from '../../components/equipmentList';
import { FAB } from '@rneui/base';
import Resources from '../../Resources';

const Facility = ({navigation, route}) => {
  const facility = route?.params?.facility;
  const sportsClubName = route?.params?.sportsClubName;
  const tempImageUrl = "https://fastly.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q"
  console.log(facility)
  return (
    <Suspense fallback={LoadingScreen()}>
        <View style={styles.view}>
          <Text style={styles.heading}>{sportsClubName} {Resources.Texts.Facility.toLowerCase()}</Text>
          <View style={styles.imageView}>
            <Image
              source={{uri: tempImageUrl}}
              style={styles.image}
              resizeMode='cover'/>
          </View>
          <View style={styles.details}>
            <Text style={styles.text}>{facility.country}, {facility.city}, {facility.coordinates}</Text>
          </View>
          <EquipmentList facilityId={facility.id}/>
          <FAB
            icon={{name: 'add', color: Resources.Colors.IconsColor}}
            color="#2089DC"
            size='small'
            placement='right'
            onPress={() => navigation.navigate({name: Resources.Screens.EquipmentList, params: {facilityId: facility.id, editAmountMode: true}})}/>
        </View>
    </Suspense>
  )
}

export default Facility