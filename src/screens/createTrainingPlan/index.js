import { View, Text } from 'react-native'
import React, { Suspense } from 'react'
import styles from './styles'
import { LoadingScreen, TrainerContext, UserContext } from '../../../App'

const CreateTrainingPlan = () => {
    const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
    const [token, setToken] = tokenState;
    const [userData, setUserData] = userDataState;
    const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;
    const { guideState } = useContext(TrainerContext)

  return (
    <Suspense fallback={LoadingScreen()}>
        <View style={styles.view}>

        </View>
    </Suspense>
  )
}

export default CreateTrainingPlan