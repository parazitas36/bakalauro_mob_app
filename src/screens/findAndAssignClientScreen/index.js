import {View} from 'react-native';
import React from 'react';
import {Card, Icon, SearchBar, Text, useTheme} from '@rneui/themed';
import styles from './styles';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {useContext} from 'react';
import {TrainerContext, UserContext} from '../../../App';
import {useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { PostCall } from '../../api/PostCall';
import { ToastAndroid } from 'react-native';

const FindAndAssignClientScreen = ({navigation, route}) => {
  const {theme} = useTheme();
  const {tokenState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const {refreshTrainingPlansState} = useContext(TrainerContext);
  const [refreshTrainingPlans, setRefreshTrainingPlans] = refreshTrainingPlansState;
  const [username, setUsername] = useState('');
  const trainingPlanId = route?.params?.trainingPlanId ?? null;

  const [users, setUsers] = useState(null);

  const Search = async () => {
    if (username.trim().length >= 3) {
      const resp = await GetCall({
        endpoint: ApiConstants().FindUsersByUsername + String(username),
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data);
        setUsers(data);
      }
    }
  };

  const ValueIsNotEmpty = val => {
    return val !== undefined && val !== null && val !== '' && val !== 'null';
  };

  const AssignPlan = async (userId) => {
    const resp = await PostCall({
        endpoint: `${ApiConstants().TrainingPlan_Endpoint}assign/${Number(trainingPlanId)}/${Number(userId)}`,
        token: token,
        body: ""
    })

    if(resp.status === 201) {
        ToastAndroid.show(
            'Training plan was assigned successfully!',
            ToastAndroid.SHORT
        )
    } else {
        ToastAndroid.show(
            'Training plan was not assigned!',
            ToastAndroid.SHORT
        )
    }
  };

  const UserCard = ({data}) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          await AssignPlan(data.id);
          setRefreshTrainingPlans(true)
          navigation.navigate('TrainingPlans')
        }}>
        <Card containerStyle={styles({theme: theme}).card}>
          <Card.Title h4>{data.username}</Card.Title>
          <Card.Divider />
          <Text
            style={
              styles({theme: theme}).usernameText
            }>{`${data.name} ${data.surname}`}</Text>
          <Card.Divider inset={true} insetType="middle" />
          {ValueIsNotEmpty(data.contactInfo?.email) && (
            <View style={styles({theme: theme}).flexBox}>
              <Icon
                name="mail-outline"
                type="ionicon"
                color={theme.colors.black}
                size={verticalScale(20)}
              />
              <Text style={styles({theme: theme}).text}>
                {data.contactInfo?.email}
              </Text>
            </View>
          )}
          {ValueIsNotEmpty(data.contactInfo?.phoneNumber) && (
            <View style={styles({theme: theme}).flexBox}>
              <Icon
                name="call-outline"
                type="ionicon"
                color={theme.colors.black}
                size={verticalScale(20)}
              />
              <Text style={styles({theme: theme}).text}>
                {data.contactInfo?.phoneNumber}
              </Text>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles({theme: theme}).view}>
      <SearchBar
        containerStyle={{width: '100%'}}
        lightTheme={theme.mode === 'light'}
        inputStyle={{color: theme.colors.black, fontWeight: 'bold'}}
        value={username}
        onChangeText={val => setUsername(val)}
        round={true}
        placeholder="Enter username"
        onEndEditing={async () => await Search()}
      />
      {users !== null ? (
        users.length > 0 ? (
          <FlatList
            data={users}
            renderItem={({item}) => <UserCard data={item} />}
          />
        ) : (
          <Text>No users were found</Text>
        )
      ) : null}
    </View>
  );
};

export default FindAndAssignClientScreen;
