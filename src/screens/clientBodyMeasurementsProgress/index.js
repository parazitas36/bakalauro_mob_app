import {View} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import styles from './styles';
import {Text, useTheme} from '@rneui/themed';
import {BMICalculator} from '../../helpers/BMICalculator';
import {useState} from 'react';
import { ScrollView } from 'react-native';
import BMIChart from '../../components/bmiChart';
import WeightChart from '../../components/weightChart';
import { useContext } from 'react';
import {LoadingScreen, UserContext} from '../../../App'
import { GetCall } from '../../api/GetCall';
import { ApiConstants } from '../../api/ApiConstants';

const ClientBodyMeasurementsProgress = ({navigation, route}) => {
  const {tokenState} = useContext(UserContext)
  const [token, setToken] = tokenState;
  const {theme} = useTheme();
  const [age, setAge] = useState(18);
  const genderButtons = ['Male', 'Female']
  const [gender, setGender] = useState(genderButtons[0]);
  const [fetchedBodyMeasurements, setFetchedBodyMeasurements] = useState(null)

  const clientId = route?.params?.clientId
  console.log(clientId)

  const measurementDays = useMemo(() => {
    return fetchedBodyMeasurements?.map(x => new Date(x.measurementDay)).map(x => new Date(x).toLocaleDateString());
  }, [fetchedBodyMeasurements])

  const weights = useMemo(() => {
    return fetchedBodyMeasurements?.map(x => x.weight);
  }, [fetchedBodyMeasurements])

  const bmis = useMemo(() => {
    return fetchedBodyMeasurements?.map(x => BMICalculator({height: x.height, weight: x.weight, isImperialUnits: false}));
  }, [fetchedBodyMeasurements])

  useEffect(() => {
    (async() => {
      const resp = await GetCall({
        endpoint: ApiConstants({ids: [clientId]}).ClientBodyMeasurements,
        token: token
      });

      if (resp.status === 200) {
        const data = await resp.json()
        setFetchedBodyMeasurements(data?.reverse())
      } else {
        setFetchedBodyMeasurements([])
      }
    })()
  }, [])

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{minHeight: '100%'}}>
      {fetchedBodyMeasurements === null ? <LoadingScreen />
      :
        <View style={styles({theme: theme}).view}>
          <Text h4>Client weight data</Text>
          {fetchedBodyMeasurements.length === 0 ? <Text>No data found</Text>
            : 
            <>
              {weights?.length > 0 && measurementDays?.length > 0 ?
              <WeightChart days={measurementDays} weights={weights} /> : null}
              {bmis?.length > 0 && measurementDays?.length > 0 ?
              <BMIChart days={measurementDays} bmis={bmis} /> : null}
            </>
          }
        </View>
      }
    </ScrollView>
  );
};

export default ClientBodyMeasurementsProgress;
