import {View} from 'react-native';
import React, { useMemo } from 'react';
import styles from './styles';
import {Button, ButtonGroup, Icon, Slider, Text, useTheme} from '@rneui/themed';
import {BMICalculator} from '../../helpers/BMICalculator';
import {FatPercentageCalculator} from '../../helpers/FatPercentageCalculator';
import {useState} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import BMIChart from '../../components/bmiChart';
import BFPercentagesChart from '../../components/bfPercentagesChart';
import WeightChart from '../../components/weightChart';

const BodyMeasurementsProgress = ({navigation, route}) => {
  const {theme} = useTheme();
  const [age, setAge] = useState(18);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const genderButtons = ['Male', 'Female']
  const [gender, setGender] = useState(genderButtons[0]);
  const bodyMeasurements = route?.params?.bodyMeasurements?.reverse();

  const measurementDays = useMemo(() => {
    return bodyMeasurements?.map(x => new Date(x.measurementDay)).map(x => new Date(x).toLocaleDateString());
  }, [bodyMeasurements])

  const weights = useMemo(() => {
    return bodyMeasurements?.map(x => x.weight);
  }, [bodyMeasurements])

  const bmis = useMemo(() => {
    return bodyMeasurements?.map(x => BMICalculator({height: x.height, weight: x.weight, isImperialUnits: false}));
  }, [bodyMeasurements])
  
  const bfPercentages = useMemo(() => {
    setShouldUpdate(false);
    if (isConfirmed) return bmis.map(x => FatPercentageCalculator({bmi: x, age: age, gender: gender}))
    return null;
  }, [isConfirmed === true, shouldUpdate === true])

  return (
    <ScrollView style={{flex: 1}}>
        <View style={styles({theme: theme}).view}>
            {weights?.length > 0 && measurementDays?.length > 0 ?
            <WeightChart days={measurementDays} weights={weights} /> : null}
            {bmis?.length > 0 && measurementDays?.length > 0 ?
            <BMIChart days={measurementDays} bmis={bmis} /> : null}
            <Text h4>Choose gender</Text>
            <ButtonGroup
                containerStyle={{width: scale(200), gap: 5, height: scale(40)}}
                buttons={genderButtons}
                selectedIndex={genderButtons.findIndex(x => x === gender)}
                onPress={(value) => setGender(genderButtons.at(value))}
                selectedTextStyle={{color: theme.colors.white, fontWeight: '700'}}
                selectedButtonStyle={{backgroundColor: theme.colors.primary}}
                disabledSelectedStyle={{backgroundColor: theme.colors.grey5}}
                buttonStyle={{backgroundColor: theme.colors.grey4}}
                textStyle={{color: theme.colors.black, textAlign: 'center', fontSize: scale(14)}}
            />
            <Text h4 style={{marginBottom: scale(10)}}>Select age</Text>
            <Slider
                value={age ?? 0}
                onValueChange={(val) => setAge(val)}
                maximumValue={100}
                minimumValue={1}
                step={1}
                allowTouchTrack
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.greyOutline}
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
                                <Text style={{
                                    color: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
                                    fontSize: scale(14),
                                    fontWeight: 'bold'
                                }}>{age ?? 0}</Text>
                            </View>
                        </View>
                    ),
                }}
            />
            <Button
                title={isConfirmed ? 'Update' : 'Confirm'}
                buttonStyle={{
                    marginTop: scale(10),
                    width: scale(200),
                    height: scale(40),
                    borderRadius: moderateScale(5),
                }}
                titleStyle={{
                    fontWeight: 'bold'
                }}
                onPress={() => {
                    if (!isConfirmed) {
                        setIsConfirmed(prev => !prev)
                    } else {
                        setShouldUpdate(true);
                    }
                }}
            />
            {isConfirmed === true && bfPercentages?.length > 0 && measurementDays?.length > 0 ?
            <BFPercentagesChart days={measurementDays} bfPercentages={bfPercentages} /> : null}
        </View>
    </ScrollView>
  );
};

export default BodyMeasurementsProgress;
