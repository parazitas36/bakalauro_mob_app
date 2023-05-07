import {View, Image, TouchableOpacity} from 'react-native';
import React, {Suspense} from 'react';
import {LoadingScreen, UserContext} from '../../../App';
import styles from './styles';
import {FAB} from '@rneui/base';
import Resources from '../../Resources';
import {useEffect} from 'react';
import {GetCall} from '../../api/GetCall';
import {ApiConstants} from '../../api/ApiConstants';
import {useState} from 'react';
import {useContext} from 'react';
import ReviewsList from '../../components/reviewsList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import CustomButton from '../../components/customButton';
import { PostCall } from '../../api/PostCall';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Card, Text, useTheme } from '@rneui/themed';

const Trainer = ({navigation, route}) => {
  const trainerId = route?.params?.trainerId;

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const [trainerData, setTrainerData] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  const [reload, setReload] = useState(false);

  const ratings = [1, 2, 3, 4 ,5]

  const RatingStar = ({starRating}) => {
    return (
      <TouchableOpacity onPress={() => setRating(starRating)}>
        <FontAwesome 
          color={theme.colors.warning} 
          size={20} 
          name={starRating > rating || rating === null ? 'star-o' : 'star'} />
      </TouchableOpacity>
    )
  }

  const SendReview = async() => {
    if (rating === null) {
      ToastAndroid.show(
        'You must select a rating!',
        ToastAndroid.SHORT
      )
      return;
    }
    const body = {
      ReviewedTrainerId: trainerId,
      ReviewText: reviewText,
      Rating: rating
    }

    const resp = await PostCall({endpoint: ApiConstants().Reviews, body: body, token: token})
    console.log(resp)
    setReload(true)
  }

  useEffect(() => {
    (async () => {
      const resp = await GetCall({
        endpoint: `${ApiConstants().Trainers}${trainerId}`,
        token: token,
      });

      if (resp.status === 200) {
        const data = await resp.json();

        const userReview = data?.reviews.filter(x => x.user.id === userData.id).at(0);

        if (userReview) {
          setReviewText(userReview?.review ?? null),
          setRating(userReview?.rating ?? null)
        }

        console.log('data: ', data);
        setTrainerData(data);
      } else {
        navigation.goBack();
      }
      setReload(false)
    })();
  }, [reload === true]);

  return (
    <Suspense fallback={LoadingScreen()}>
      {trainerData === null ? LoadingScreen() : 
      <View style={styles({theme: theme}).view}>
        <Text style={styles({theme: theme}).heading}>{trainerData?.trainer?.username}</Text>
        <View style={styles({theme: theme}).details}>
          <View style={styles({theme: theme}).flexRow}>
            <View style={styles({theme: theme}).subView}>
              <Text style={styles({theme: theme}).boldText}>Contacts</Text>
              {trainerData?.trainer?.email && 
              <Text style={styles({theme: theme}).text}>{trainerData?.trainer?.email}</Text>}
              {trainerData?.trainer?.phone && 
              <Text style={styles({theme: theme}).text}>{trainerData?.trainer?.phone}</Text>}
            </View>
            <View style={{...styles({theme: theme}).subView, alignItems: 'flex-end'}}>
              <View style={styles({theme: theme}).flexRow}>
                <Text style={styles({theme: theme}).text}>
                  Rating:  {trainerData?.trainer?.averageRating ?? 0}
                </Text>
                <Icon name='star' color={theme.colors.warning} size={20} />
              </View>
            </View>
          </View>
        </View>
        <ReviewsList reviews={trainerData?.reviews}/>
        <Card containerStyle={styles({theme: theme}).reviewView}>
          <View style={styles({theme: theme}).flexRow}>
              <Text style={styles({theme: theme}).ratingText}>Rating </Text>
              {ratings.map(x => {
                return <RatingStar starRating={x} key={x} />
              })}
          </View>
          <Card.Divider />
          <TextInput
            multiline={true}
            numberOfLines={5}
            placeholder='Enter your review' 
            placeholderTextColor={theme.colors.grey2}
            value={reviewText}
            onChangeText={setReviewText}
            style={styles({theme: theme}).reviewText} />
          <CustomButton
            btnText={trainerData?.reviews.filter(x => x.user.id === userData.id)?.length > 0 ? 
              'Update' : Resources.ButtonTexts.SaveBtnText}
            onPress={async() => await SendReview()}
            styles={styles({theme: theme})}
            disabled={reload === true}
            loading={reload === true}
          />
        </Card>
      </View>
      }
    </Suspense>
  );
};

export default Trainer;
