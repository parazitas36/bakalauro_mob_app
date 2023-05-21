import {Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import {useState} from 'react';
import { ToastAndroid } from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {ApiConstants} from '../../api/ApiConstants';
import {PatchCall} from '../../api/PatchCall';
import styles from './styles';

const Invite = ({ navigation, theme, token, data, reload, setReload, hideButtons = false}) => {

  const [disableButtons, setDisableButtons] = useState(false);

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

  const InviteCard = () => {
    return (
      <Card containerStyle={styles({theme: theme}).card}>
        <Card.Title style={{color: TitleColor()}}>{data?.status === 'Offered' ? 'Invited' : data?.status}</Card.Title>
        <Card.Divider
          subHeader={`Invited by ${data?.sportsClub}`}
          subHeaderStyle={{
            textAlign: 'center',
            marginBottom: 5,
            fontWeight: 'bold',
            color: theme.colors.grey2,
          }}
        />
        <Icon name='calendar' type='font-awesome' size={scale(22)} color={theme.colors.black} />
        <Text style={styles({theme: theme}).text}>{new Date(data?.date).toDateString()}</Text>
      </Card>
    );
  };

  const AcceptPress = async () => {
    setDisableButtons(true);
    const resp = await PatchCall({
      endpoint: `${ApiConstants({ids: [data.id]}).UpdateTrainerInvite}Accepted`,
      token: token,
    })
    console.log(resp);

    if (resp.status === 200) {
      ToastAndroid.show(
        'Invite accepted successfully!',
        ToastAndroid.SHORT
      )
      setReload(true);
    }
    setDisableButtons(false);
  };

  const DeletePress = async () => {
    setDisableButtons(true);
    const resp = await PatchCall({
      endpoint: `${ApiConstants({ids: [data.id]}).UpdateTrainerInvite}Declined`,
      token: token,
    })
    console.log(resp);

    if (resp.status === 200) {
      ToastAndroid.show(
        'Invite declined successfully!',
        ToastAndroid.SHORT
      )
      setReload(true);
    }
    setDisableButtons(false);
  };

  return (
    <Animated.View entering={FadeInLeft.delay(300)}>
      <ListItem.Swipeable
        leftWidth={scale(hideButtons === true ? 0 : 50)}
        rightWidth={scale(hideButtons === true ? 0 : 50)}
        minSlideWidth={scale(hideButtons === true ? 0 : 10)}
        leftContent={() => (
          <Animated.View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            entering={FadeInLeft.delay(600)}>
            <Button
              containerStyle={{
                justifyContent: 'center',
              }}
              disabled={disableButtons}
              type="clear"
              icon={{
                name: 'check',
                type: 'font-awesome-5',
                color: theme.colors.black,
              }}
              onPress={async() => await AcceptPress()}
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
                justifyContent: 'center',
              }}
              disabled={disableButtons}
              type="clear"
              icon={{name: 'delete-outline', color: theme.colors.error}}
              onPress={async () => await DeletePress()}
            />
          </Animated.View>
        )}>
        <InviteCard />
      </ListItem.Swipeable>
    </Animated.View>
  );
};

export default Invite;
