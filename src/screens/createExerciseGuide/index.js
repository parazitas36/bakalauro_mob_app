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

  const blockList = useMemo(() => {
    return blocks.map((x, i) => (
      <GuideBlock
        key={i}
        id={x.id}
        data={x}
        blocksState={[blocks, setBlocks]}
        idState={[currentId, setCurrentId]}
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
        if (image) {
          const block = {
            id: currentId,
            type: Resources.BlockType.Image,
            content: image,
          };

          setBlocks(prev => [...prev, block]);
          setCurrentId(prev => prev + 1);
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
        if (video) {
          const block = {
            id: currentId,
            type: Resources.BlockType.Video,
            content: video,
          };

          setBlocks(prev => [...prev, block]);
          setCurrentId(prev => prev + 1);
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
        style={styles.view}
        contentContainerStyle={styles.viewContainer}
        entering={FadeInDown.delay(100)}
        exiting={FadeOutUp}>
        <Animated.Text style={styles.heading}>{Resources.Texts.ExerciseGuideCreation}</Animated.Text>
        {blocks.length > 0 ? blockList : null}
        <View style={styles.addView}>
          <Text style={styles.text}>{Resources.Texts.ChooseBlockToAdd}</Text>
          <View style={styles.buttonsWindow}>
            <CustomButtonWithIcon
              btnText={Resources.ButtonTexts.Image}
              icon={() => { return <Icon name="image" size={verticalScale(Resources.Sizes.AddBlockIconSize)} color={Resources.Colors.IconsColor} /> }}
              onPress={async() => await addImage()}
              styles={styles}
            />
            <CustomButtonWithIcon
              btnText={Resources.ButtonTexts.Text}
              icon={() => { return <Icon name="keyboard" size={verticalScale(Resources.Sizes.AddBlockIconSize)} color={Resources.Colors.IconsColor} /> }}
              onPress={() => setTextInputVisible(true)}
              styles={styles}
            />
            <CustomButtonWithIcon
              btnText={Resources.ButtonTexts.Video}
              icon={() => { return <Icon name="video" size={verticalScale(Resources.Sizes.AddBlockIconSize)} color={Resources.Colors.IconsColor} /> }}
              onPress={async () => await addVideo()}
              styles={styles}
            />
          </View>
        </View>
        <CustomButton
          styles={{btnText: styles.btnText, button: styles.saveButton}}
          btnText={Resources.ButtonTexts.SaveBtnText}
          onPress={SavePress} />
      </Animated.ScrollView>
    </Suspense>
  );
};

export default CreateExerciseGuide;
