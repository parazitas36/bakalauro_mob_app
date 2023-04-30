import { View, Text, Image } from 'react-native'
import React, { Suspense, useContext } from 'react'
import { LoadingScreen, UserContext } from '../../../App';
import styles from './styles';
import EquipmentList from '../../components/equipmentList';
import { FAB } from '@rneui/base';
import Resources from '../../Resources';
import { ApiConstants } from '../../api/ApiConstants';
import { useTheme } from '@rneui/themed';

const Facility = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const facility = route?.params?.facility;
  const sportsClubName = route?.params?.sportsClubName;
  const tempImageUrl = "https://fastly.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q"
  
  const {theme} = useTheme();

  console.log(facility)


  return (
    <Suspense fallback={LoadingScreen()}>
        <View style={styles({theme: theme}).view}>
          <Text style={styles({theme: theme}).heading}>{sportsClubName} {Resources.Texts.Facility.toLowerCase()}</Text>
          <View style={styles({theme: theme}).imageView}>
          <Image
                source={{
                  uri: facility.imageUri ? `${ApiConstants().Exercise_Endpoint}file/${String(facility.imageUri)}` : tempImageUrl,
                  headers: {Authorization: `Bearer ${token}`},
                }}
                style={styles({theme: theme}).image}
              />
          </View>
          <View style={styles({theme: theme}).details}>
            <Text style={styles({theme: theme}).text}>{facility.country}, {facility.city}, {facility.coordinates}</Text>
          </View>
          <EquipmentList facilityId={facility.id}/>
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