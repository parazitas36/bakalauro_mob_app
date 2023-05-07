import {Button, Text, useTheme} from '@rneui/themed';
import React from 'react';
import { useContext } from 'react';
import {useState} from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {verticalScale} from 'react-native-size-matters';
import { UserContext } from '../../../App';
import { ApiConstants } from '../../api/ApiConstants';
import { PostCall } from '../../api/PostCall';
import TrainingPlan from '../../components/trainingPlan';
import TrainingPlanOffer from '../../components/trainingPlanOffer';
import Resources from '../../Resources';
import TrainingPlans from '../trainingPlans';
import styles from './styles';

const AssignTrainingPlan = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
  const {theme} = useTheme();
  const [selectedTrainingPlan, setSelectedTrainingPlan] = useState(null);
  const trainingPlanOffer = route?.params?.trainingPlanOffer;

  const SavePress = async() => {
    console.log(selectedTrainingPlan)
    const resp = await PostCall({
        endpoint: `${ApiConstants().TrainingPlan_Endpoint}assign/${Number(selectedTrainingPlan.id)}/${Number(trainingPlanOffer.createdBy.id)}`,
        token: token,
        body: ""
    })

    console.log(resp);

    if (resp.status === 201) {
        navigation.goBack();
    }
  }

  return (
    <Animated.View
      entering={FadeInLeft.delay(300)}
      style={styles({theme: theme}).view}>
      <Text h4>Select training plan</Text>
      <TrainingPlanOffer data={trainingPlanOffer} theme={theme} hideButtons={true}/>
      {selectedTrainingPlan === null ?
        <TrainingPlans
          selectView={true}
          navigation={navigation}
          setSelectedTrainingPlan={setSelectedTrainingPlan}
        />
      : <Animated.View entering={FadeInLeft.delay(300)}>
          <TrainingPlan trainingPlan={selectedTrainingPlan} setSelectedTrainingPlan={setSelectedTrainingPlan} selectView={true} theme={theme} />
          <Button
            title={Resources.ButtonTexts.SaveBtnText}
            buttonStyle={styles({theme: theme}).buttonStyle}
            titleStyle={styles({theme: theme}).buttonTitle}
            onPress={async() => await SavePress()}
          />
        </Animated.View>}
    </Animated.View>
  );
};

export default AssignTrainingPlan;
