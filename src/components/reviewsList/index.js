import {Text} from 'react-native';
import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import styles from './styles';
import {LoadingScreen, UserContext} from '../../../App';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Resources from '../../Resources';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const ReviewsList = ({reviews}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const stars = [1, 2, 3, 4, 5]

  const ReviewsItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.nameView}>
          <View style={styles.nameSubView}>
            <Text style={{color: 'white'}}>{item.user.username}</Text>
          </View>
          <View style={{...styles.nameSubView, alignItems: 'flex-end'}}>
            <View style={styles.flexRow}>
              {stars.map((x, i) => {
                return (
                  <Icon 
                    key={i}
                    color={Resources.Colors.IconsColor}
                    size={20}
                    name={x <= item.rating ? 'star' : 'star-o'}
                  />
                )
              })}
            </View>
          </View>
        </View>
        {item.review !== null && item.review !== '' ? <View style={styles.reviewView}>
          <Text style={styles.reviewTextInCard}>{item.review}</Text>
        </View> : null}
      </View>
    )
  }

  return (
    <>
      {reviews === null ? LoadingScreen() : 
        <Animated.View
          style={styles.view}
          entering={FadeInUp.delay(300)}
          exiting={FadeOutDown}>
          {reviews !== null && <Text style={styles.reviewText}>{`Reviews (${reviews?.length})`}</Text>}
          {reviews?.length > 0 ? 
            <FlatList 
              data={reviews} 
              renderItem={({item, index}) => <ReviewsItem item={item} key={index} />} />
            : <Text style={styles.noReviewText}>No reviews</Text>
          }
        </Animated.View>
      }
    </>
  );
};
export default ReviewsList;
