import {View, Text, Image, TouchableOpacity} from 'react-native';
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

const Trainer = ({navigation, route}) => {
  const trainerId = route?.params?.trainerId;

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [trainerData, setTrainerData] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  const [reload, setReload] = useState(false);

  const ratings = [1, 2, 3, 4 ,5]

  const RatingStar = ({starRating}) => {
    return (
      <TouchableOpacity onPress={() => setRating(starRating)}>
        <FontAwesome 
          color={Resources.Colors.IconsColor} 
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
      <View style={styles.view}>
        <Text style={styles.heading}>{trainerData?.trainer?.username}</Text>
        <View style={styles.details}>
          <View style={styles.flexRow}>
            <View style={styles.subView}>
              <Text style={styles.boldText}>Contacts</Text>
              {trainerData?.trainer?.email && 
              <Text style={styles.text}>{trainerData?.trainer?.email}</Text>}
              {trainerData?.trainer?.phone && 
              <Text style={styles.text}>{trainerData?.trainer?.phone}</Text>}
            </View>
            <View style={{...styles.subView, alignItems: 'flex-end'}}>
              <View style={styles.flexRow}>
                <Text style={styles.text}>
                  Rating:  {trainerData?.trainer?.averageRating ?? 0}
                </Text>
                <Icon name='star' color={Resources.Colors.IconsColor} size={20} />
              </View>
            </View>
          </View>
        </View>
        <ReviewsList reviews={trainerData?.reviews}/>
        <View style={styles.reviewView}>
          <View style={styles.flexRow}>
            <Text style={styles.ratingText}>Rating </Text>
            {ratings.map(x => {
              return <RatingStar starRating={x} key={x} />
            })}
          </View>
          <TextInput
            multiline={true}
            numberOfLines={5}
            placeholder='Enter your review' 
            placeholderTextColor={Resources.Colors.PlaceholdersColor}
            value={reviewText}
            onChangeText={setReviewText}
            style={styles.reviewText} />
          <CustomButton
            btnText={trainerData?.reviews.filter(x => x.user.id === userData.id)?.length > 0 ? 
              'Update' : Resources.ButtonTexts.SaveBtnText}
            onPress={async() => await SendReview()}
            styles={styles}
            disabled={reload === true}
            loading={reload === true}
          />
        </View>
      </View>
      }
    </Suspense>
  );
};

export default Trainer;
