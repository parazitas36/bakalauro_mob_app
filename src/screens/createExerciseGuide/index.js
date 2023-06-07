import React, {useMemo, useState, useContext, Suspense} from 'react';
import Animated, {
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';

import styles from './styles';
import {View, Text} from 'react-native';
import Resources from '../../Resources';
import {LoadingScreen, TrainerContext, UserContext} from '../../../App';
import CustomButtonWithIcon from '../../components/customButtonWithIcon';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {verticalScale} from 'react-native-size-matters';
import GuideBlock from '../../components/guideBlock';
import TextInputModal from '../../components/textInputModal';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../components/customButton';
import { useTheme } from '@rneui/themed';

const CreateExerciseGuide = ({navigation, route}) => {
  const {tokenState, userDataState, roleSpecificDataState} = useContext(UserContext);
  const { guideState } = useContext(TrainerContext)
  const [token, setToken] = tokenState;
  const [userData, setUserData] = userDataState;
  const [roleSpecificData, setRoleSpecificData] = roleSpecificDataState;

  const [textInputVisible, setTextInputVisible] = useState(false);
  
  const [guide, setGuide] = guideState
  const [blocks, setBlocks] = useState(guide);
  const [currentId, setCurrentId] = useState(blocks?.length ?? 0);

  const {theme} = useTheme();

  const GetSizeMb = (size) => {
    const mbSize = (Number(size) / 1024 / 1024)
    return mbSize;
  }

  const blockList = useMemo(() => {
    return blocks.map((x, i) => (
      <GuideBlock
        key={i}
        id={x.id}
        data={x}
        blocksState={[blocks, setBlocks]}
        idState={[currentId, setCurrentId]}
        theme={theme}
      />
    ));
  }, [blocks]);

  const addImage = async () => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel !== true) {
        const image = result?.assets.at(0);
        const mbSize = GetSizeMb(image.fileSize);
        if (image && mbSize <= 5) {
          const block = {
            id: currentId,
            type: Resources.BlockType.Image,
            content: image,
          };

          setBlocks(prev => [...prev, block]);
          setCurrentId(prev => prev + 1);
        } else if (mbSize > 5){
          ToastAndroid.show(
            'Image maximum size is 5MB!',
            ToastAndroid.SHORT
          )
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addVideo = async () => {
    const options = {
      mediaType: 'video',
      noData: true,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel !== true) {
        const video = result?.assets.at(0);
        const mbSize = GetSizeMb(video.fileSize);
        if (video && mbSize <= 10) {
          const block = {
            id: currentId,
            type: Resources.BlockType.Video,
            content: video,
          };

          setBlocks(prev => [...prev, block]);
          setCurrentId(prev => prev + 1);
        } else if (mbSize > 10){
          ToastAndroid.show(
            'Video maximum size is 10MB!',
            ToastAndroid.SHORT
          )
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const SavePress = () => {
    setGuide(blocks);
    navigation.goBack()
  }

  return (
    <Suspense fallback={LoadingScreen()}>
      <TextInputModal
        visibleState={[textInputVisible, setTextInputVisible]}
        blocksState={[blocks, setBlocks]}
        idState={[currentId, setCurrentId]}
      />
      <Animated.ScrollView
        style={styles({theme: theme}).view}
        contentContainerStyle={styles({theme: theme}).viewContainer}
        entering={FadeInDown.delay(100)}
        exiting={FadeOutUp}>
        <Animated.Text style={styles({theme: theme}).heading}>{Resources.Texts.ExerciseGuideCreation}</Animated.Text>
        {blocks.length > 0 ? blockList : null}
        <View style={styles({theme: theme}).addView}>
          <Text style={styles({theme: theme}).text}>{Resources.Texts.ChooseBlockToAdd}</Text>
          <View style={styles({theme: theme}).buttonsWindow}>
            <CustomButtonWithIcon
              btnText={Resources.ButtonTexts.Image}
              icon={() => { return <Icon name="image" size={verticalScale(Resources.Sizes.AddBlockIconSize)} color={theme.colors.black} /> }}
              onPress={async() => await addImage()}
              styles={styles({theme: theme})}
            />
            <CustomButtonWithIcon
              btnText={Resources.ButtonTexts.Text}
              icon={() => { return <Icon name="keyboard" size={verticalScale(Resources.Sizes.AddBlockIconSize)} color={theme.colors.black} /> }}
              onPress={() => setTextInputVisible(true)}
              styles={styles({theme: theme})}
            />
            <CustomButtonWithIcon
              btnText={Resources.ButtonTexts.Video}
              icon={() => { return <Icon name="video" size={verticalScale(Resources.Sizes.AddBlockIconSize)} color={theme.colors.black} /> }}
              onPress={async () => await addVideo()}
              styles={styles({theme: theme})}
            />
          </View>
        </View>
        {blocks?.length > 0 && <CustomButton
          styles={{btnText: styles({theme: theme}).btnText, button: styles({theme: theme}).saveButton}}
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={SavePress} />}
      </Animated.ScrollView>
    </Suspense>
  );
};

export default CreateExerciseGuide;
