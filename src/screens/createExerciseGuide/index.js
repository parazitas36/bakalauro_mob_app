import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, { FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp } from 'react-native-reanimated';
import {TextInput} from 'react-native';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import {LoadingScreen, UserContext} from '../../../App';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import { Validation } from './validation';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { verticalScale } from 'react-native-size-matters';
import GuideBlock from '../../components/guideBlock';
import TextInputModal from '../../components/textInputModal';

const CreateExerciseGuide = ({navigation}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [textInputVisible, setTextInputVisible] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [blocks, setBlocks] = useState([]);

  const blockList = useMemo(() => {
    return blocks.map((x, i) => <GuideBlock key={i} id={i} data={x} blocksState={[blocks, setBlocks]} idState={[currentId, setCurrentId]}/>)
  }, [blocks])

  return (
    <Suspense fallback={LoadingScreen()}>
      <TextInputModal visibleState={[textInputVisible, setTextInputVisible]} blocksState={[blocks, setBlocks]} idState={[currentId, setCurrentId]}/>
      <Animated.ScrollView style={styles.view} contentContainerStyle={styles.viewContainer} entering={FadeInDown.delay(100)} exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>
          Guide Creation
        </Animated.Text>
        {blocks.length > 0 ? 
          blockList : null}
        <View style={styles.addView}>
          <Text style={styles.text}>Choose what to add</Text>
          <View style={styles.buttonsWindow}>
            <CustomButtonWithIcon 
              btnText={'Image'} 
              icon={() => { return <Icon name='image' size={verticalScale(22)} color='white'/> }}
              onPress={() => { 
                setBlocks(prev => [...prev, {id: currentId, type: Resources.BlockType.Image, content: 'https://picsum.photos/300/200'}]);
                setCurrentId(prev => prev+1)
              }} 
              styles={styles}/>
            <CustomButtonWithIcon 
              btnText={'Text'} 
              icon={() => { return <Icon name='keyboard' size={verticalScale(22)} color='white'/> }}
              onPress={() => setTextInputVisible(true)} 
              styles={styles}/>
            <CustomButtonWithIcon 
              btnText={'Video'} 
              icon={() => { return <Icon name='video' size={verticalScale(22)} color='white'/> }}
              onPress={async() => await SavePress()} 
              styles={styles}/>
          </View>
        </View>
      </Animated.ScrollView>
    </Suspense>
  );
};

export default CreateExerciseGuide;
