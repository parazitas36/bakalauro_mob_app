import {View, TouchableOpacity} from 'react-native';
import React, {Suspense} from 'react';
import {LoadingScreen, UserContext} from '../../../App';
import styles from './styles';
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
import { Card, Text, useTheme } from '@rneui/themed';
import SportsClubCard from '../../components/sportsClubCard';

const SportsClub = ({navigation, route}) => {
  const sportsClubId = route?.params?.id;

  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const [sportsClubData, setSportsClubData] = useState(null);
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
      ReviewedSportsClubId: sportsClubId,
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
        endpoint: `${ApiConstants().SportsClub_Endpoint}${sportsClubId}/full`,
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
        setSportsClubData(data);
      } else {
        navigation.goBack();
      }
      setReload(false)
    })();
  }, [reload === true]);

  return (
    <Suspense fallback={LoadingScreen()}>
      {sportsClubData === null ? LoadingScreen() : 
      <View style={styles({theme: theme}).view}>
        <SportsClubCard data={sportsClubData} disabled={true} theme={theme}/>
        <ReviewsList reviews={sportsClubData?.reviews}/>
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
            btnText={sportsClubData?.reviews.filter(x => x.user.id === userData.id)?.length > 0 ? 
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

export default SportsClub;
