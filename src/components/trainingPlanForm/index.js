import React from 'react';
import styles from './styles';
import Resources from '../../Resources';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { Button, Card, ListItem, Text } from '@rneui/themed';
import { scale, verticalScale } from 'react-native-size-matters';
import { useContext } from 'react';
import { UserContext } from '../../../App';

const TrainingPlanForm = ({data, theme}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  console.log(data)

  const formDetails = JSON.parse(data.formDetails);
  console.log(formDetails)

  const TrainingPlanFormCard = () => {
    return (
      <Card containerStyle={styles({theme: theme}).view}>
        <Card.Title>{formDetails.goal}</Card.Title>
        <Card.Divider subHeader={data.username} subHeaderStyle={{textAlign: 'center'}}/>
        <Text h4 h4Style={styles({theme: theme}).headings}>Details</Text>
        <Text style={styles({theme: theme}).text}>{formDetails.details}</Text>
        <Text h4 h4Style={styles({theme: theme}).headings}>Health issues</Text>
        <Text style={styles({theme: theme}).text}>{formDetails.healthIssues ?? 'None'}</Text>
        {data.offered === true ? 
        <Text h4 h4Style={{fontSize: verticalScale(18), textAlign: 'center', color: theme.colors.primary}}>
          Offered
        </Text> : null}
      </Card>
    )
  }

  if (userData.role === 'User') {
    return (
      <Animated.View entering={FadeIn.delay(200)}>
        <ListItem.Swipeable
          leftWidth={scale(0)}
          rightWidth={scale(50)}
          minSlideWidth={scale(50)}
          rightContent={() => (
            <Animated.View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              entering={FadeInLeft.delay(600)}>
              <Button
                containerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                type="clear"
                icon={{ name: 'delete-outline' }}
                onPress={() => {}}
              />
            </Animated.View>
          )}>
          <TrainingPlanFormCard />
        </ListItem.Swipeable>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.delay(200)}>
      <TrainingPlanFormCard />
    </Animated.View>
  );
};

export default React.memo(TrainingPlanForm);
