import {Button, Card, ListItem, Text, Tooltip} from '@rneui/themed';
import {useState} from 'react';
import {useContext} from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {UserContext} from '../../../App';
import {ApiConstants} from '../../api/ApiConstants';
import {DeleteCall} from '../../api/DeleteCall';
import {PatchCall} from '../../api/PatchCall';
import styles from './styles';

const TrainingPlanOffer = ({ navigation, theme, data, reload, setReload, hideButtons = false }) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [leftToolTipOpen, setLeftToolTipOpen] = useState(false);
  const [rightToolTipOpen, setRightToolTipOpen] = useState(false);

  const [disableButtons, setDisableButtons] = useState(false);

  const Price = () => {
    return data?.priceTo === data?.priceFrom && data?.priceTo === 0
      ? 'FREE'
      : data?.priceTo === data?.priceFrom
      ? `€${data?.priceTo.toFixed(2)}`
      : `€${data?.priceFrom.toFixed(2)} - €${data?.priceTo.toFixed(2)}`;
  };

  const SubHeader = () => {
    return userData.role === 'Trainer'
      ? `Created by: ${data?.createdBy?.username}`
      : `Offered by: ${data?.trainer?.username}`;
  };

  const TitleColor = () => {
    if (data?.status === 'Offered') {
      return theme.colors.primary;
    } else if (data?.status === 'Accepted') {
      return theme.colors.success;
    } else if (data?.status === 'Declined') {
      return theme.colors.error;
    }
    return theme.colors.black;
  };

  const TrainingPlanOfferCard = () => {
    return (
      <Card containerStyle={styles({theme: theme}).card}>
        <Card.Title style={{color: TitleColor()}}>{data?.status}</Card.Title>
        <Card.Divider
          subHeader={SubHeader()}
          subHeaderStyle={{
            textAlign: 'center',
            marginBottom: 5,
            fontWeight: 'bold',
          }}
        />
        <Text style={styles({theme: theme}).headings}>Details</Text>
        <Text style={styles({theme: theme}).text}>{data?.details}</Text>
        <Text style={styles({theme: theme}).headings}>Price</Text>
        <Text style={styles({theme: theme}).text}>{Price()}</Text>
      </Card>
    );
  };

  const AcceptPress = async () => {
    const resp = await PatchCall({
      endpoint: `${ApiConstants().TrainingPlanOffers}${Number(
        data?.trainingPlanOfferId,
      )}/Accepted`,
      token: token,
    });
    console.log(resp);

    if (resp.status === 200) {
      setReload(true);
    }
  };

  const DeletePress = async () => {
    setDisableButtons(true);
    if (userData.role === 'Trainer') {
      const resp = await DeleteCall({
        endpoint: `${ApiConstants().TrainingPlanOffers}${Number(
          data?.trainingPlanOfferId,
        )}`,
        token: token,
      });

      console.log(resp);

      if (resp.status === 204) {
        setReload(true);
      }
    } else {
      const resp = await PatchCall({
        endpoint: `${ApiConstants().TrainingPlanOffers}${Number(
          data?.trainingPlanOfferId,
        )}/Declined`,
        token: token,
      });
      console.log(resp);

      if (resp.status === 200) {
        setReload(true);
      }
    }
    setDisableButtons(false);
  };

  if (userData.role === 'Trainer') {
    return (
      <Animated.View entering={FadeInLeft.delay(300)}>
        <ListItem.Swipeable
          leftWidth={scale(
            hideButtons === true ? 0 : data?.status === 'Accepted' ? 50 : 0,
          )}
          rightWidth={scale(hideButtons === true ? 0 : 50)}
          minSlideWidth={scale(hideButtons === true ? 0 : 10)}
          leftContent={() => (
            <Animated.View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              entering={FadeInLeft.delay(600)}>
              <Tooltip
                withPointer={false}
                visible={leftToolTipOpen}
                backgroundColor={theme.colors.black}
                popover={
                  <Text style={{color: theme.colors.white}}>
                    Assign training plan
                  </Text>
                }
              />
              <Button
                containerStyle={{
                  justifyContent: 'center',
                }}
                disabled={disableButtons}
                type="clear"
                icon={{name: 'clipboard-list', type: 'font-awesome-5'}}
                onPress={() => {
                  navigation.navigate({
                    name: 'AssignTrainingPlan',
                    params: {trainingPlanOffer: data},
                  });
                }}
                onLongPress={() => setLeftToolTipOpen(true)}
                onPressOut={() => setLeftToolTipOpen(false)}
              />
            </Animated.View>
          )}
          rightContent={() => (
            <Animated.View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              entering={FadeInLeft.delay(600)}>
              <Tooltip
                withPointer={false}
                visible={rightToolTipOpen}
                backgroundColor={theme.colors.black}
                popover={
                  <Text style={{color: theme.colors.white}}>
                    Delete offer
                  </Text>
                }
              />
              <Button
                containerStyle={{
                  justifyContent: 'center',
                }}
                disabled={disableButtons}
                type="clear"
                icon={{name: 'delete-outline'}}
                onPress={async () => await DeletePress()}
                onLongPress={() => setRightToolTipOpen(true)}
                onPressOut={() => setRightToolTipOpen(false)}
              />
            </Animated.View>
          )}>
          <TrainingPlanOfferCard />
        </ListItem.Swipeable>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInLeft.delay(300)}>
      <ListItem.Swipeable
        leftWidth={scale(
          hideButtons === true ? 0 : data?.status === 'Offered' ? 50 : 0,
        )}
        rightWidth={scale(hideButtons === true ? 0 : 50)}
        minSlideWidth={scale(
          hideButtons === true ? 0 : data?.status === 'Offered' ? 50 : 0,
        )}
        leftContent={() => (
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
              disabled={disableButtons}
              type="clear"
              icon={{name: 'check'}}
              onPress={async () => await AcceptPress()}
            />
          </Animated.View>
        )}
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
              disabled={disableButtons}
              type="clear"
              icon={{name: 'delete-outline'}}
              onPress={async () => await DeletePress()}
            />
          </Animated.View>
        )}>
        <TrainingPlanOfferCard />
      </ListItem.Swipeable>
    </Animated.View>
  );
};

export default TrainingPlanOffer;
