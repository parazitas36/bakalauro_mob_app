import {View} from 'react-native';
import React, { useMemo } from 'react';
import styles from './styles';
import {Button, ButtonGroup, Icon, Slider, Text, useTheme} from '@rneui/themed';
import {BMICalculator} from '../../helpers/BMICalculator';
import {FatPercentageCalculator} from '../../helpers/FatPercentageCalculator';
import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import BMIChart from '../../components/bmiChart';
import BFPercentagesChart from '../../components/bfPercentagesChart';

const BodyMeasurementsProgress = ({navigation, route}) => {
  const {theme} = useTheme();
  const [age, setAge] = useState(18);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const genderButtons = ['Male', 'Female']
  const [gender, setGender] = useState(genderButtons[0]);
  const bodyMeasurements = route?.params?.bodyMeasurements;

  const measurementDays = useMemo(() => {
    return bodyMeasurements?.map(x => new Date(x.measurementDay)).sort().map(x => x.toLocaleDateString());
  }, [bodyMeasurements])

  const bmis = useMemo(() => {
    return bodyMeasurements?.map(x => BMICalculator({height: x.height, weight: x.weight, isImperialUnits: false}));
  }, [bodyMeasurements])
  
  const bfPercentages = useMemo(() => {
    if (isConfirmed) return bmis.map(x => FatPercentageCalculator({bmi: x, age: age, gender: gender}))
    return null;
  }, [bmis, age, gender, isConfirmed])

  console.log('bmis: ', bmis);
  //console.log(measurementDays.map(x => x.toLocaleDateString()))
  console.log(bfPercentages)

  const set = new Set(measurementDays);

  return (
    <ScrollView>
        <View style={styles({theme: theme}).view}>
            <Text h4>Choose gender</Text>
            <ButtonGroup
                containerStyle={{width: scale(250)}}
                buttons={genderButtons}
                selectedIndex={genderButtons.findIndex(x => x === gender)}
                onPress={(value) => setGender(genderButtons.at(value))}
                selectedTextStyle={{color: theme.colors.white, fontWeight: '700'}}
                selectedButtonStyle={{backgroundColor: theme.colors.primary}}
                disabledSelectedStyle={{backgroundColor: theme.colors.grey5}}
                buttonStyle={{backgroundColor: theme.colors.grey4}}
                textStyle={{color: theme.colors.black, textAlign: 'center'}}
            />
            <Text h4>Select age</Text>
            <Slider
                value={age ?? 0}
                onValueChange={(val) => setAge(val)}
                maximumValue={100}
                minimumValue={1}
                step={1}
                allowTouchTrack
                trackStyle={{height: scale(5), backgroundColor: 'transparent', width: scale(300)}}
                thumbStyle={{
                height: scale(15),
                width: scale(15),
                backgroundColor: 'transparent',
                }}
                thumbProps={{
                    children: (
                        <View style={{right: scale(15), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center'}}>
                            <View style={styles({theme: theme}).circleView}>
                                <Text style={{color: theme.colors.white}}>{age ?? 0}</Text>
                            </View>
                        </View>
                    ),
                }}
            />
            <Button
                title='Confirm'
                onPress={() => setIsConfirmed(prev => !prev)}
            />
            {isConfirmed === true && bmis?.length > 0 && measurementDays?.length > 0 ?
            <BMIChart days={measurementDays} bmis={bmis} /> : null}
        </View>
    </ScrollView>
  );
};

export default BodyMeasurementsProgress;
