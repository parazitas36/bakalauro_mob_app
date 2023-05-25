import {Text} from 'react-native';
import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import styles from './styles';
import {LoadingScreen, UserContext} from '../../../App';
import Animated, {FadeInLeft, FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Resources from '../../Resources';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTheme } from '@rneui/themed';

const ReviewsList = ({reviews}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const {theme} = useTheme();

  const stars = [1, 2, 3, 4, 5]

  const ReviewsItem = ({item}) => {
    return (
      <View style={styles({theme: theme}).card}>
        <View style={styles({theme: theme}).nameView}>
          <View style={styles({theme: theme}).nameSubView}>
            <Text style={{color: theme.colors.black}}>{item.user.username}</Text>
          </View>
          <View style={{...styles({theme: theme}).nameSubView, alignItems: 'flex-end'}}>
            <View style={styles({theme: theme}).flexRow}>
              {stars.map((x, i) => {
                return (
                  <Icon 
                    key={i}
                    color={theme.colors.warning}
                    size={20}
                    name={x <= item.rating ? 'star' : 'star-o'}
                  />
                )
              })}
            </View>
          </View>
        </View>
        {item.review !== null && item.review !== '' ? <View style={styles({theme: theme}).reviewView}>
          <Text style={styles({theme: theme}).reviewTextInCard}>{item.review}</Text>
        </View> : null}
      </View>
    )
  }

  return (
    <>
      {reviews === null ? LoadingScreen() : 
        <Animated.View
          style={styles({theme: theme}).view}
          entering={FadeInLeft.delay(300)}>
          {reviews !== null && <Text style={styles({theme: theme}).reviewText}>{`Reviews (${reviews?.length})`}</Text>}
          {reviews?.length > 0 ? 
            <FlatList 
              data={reviews} 
              renderItem={({item, index}) => <ReviewsItem item={item} key={index} />} />
            : <Text style={styles({theme: theme}).noReviewText}>No reviews</Text>
          }
        </Animated.View>
      }
    </>
  );
};
export default ReviewsList;
