import {View, Text} from 'react-native';
import React from 'react';
import Resources from '../../Resources';
import styles from './styles';
import {Image} from 'react-native';
import CustomButtonWithIcon from '../customButtonWithIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';

const GuideBlock = ({data, id, blocksState, idState, theme}) => {
  const type = data?.type;

  const first = () => data.id === 0;
  const last = () => data.id === blocks.at(-1)?.id;

  const [blocks, setBlocks] = blocksState;
  const [currentId, setCurrentId] = idState;

  const RemoveBlock = () => {
    const blocksWithoutCurrent = blocks.filter(x => x.id !== data.id);
    blocksWithoutCurrent.forEach(x => {
      if (Number(x.id) > Number(data.id)) {
        x.id--;
      }
    });

    setBlocks(blocksWithoutCurrent);
    setCurrentId(prev => prev - 1);
  };

  const MoveUp = () => {
    if (first() === true) {
      return;
    }

    const updatedBlocks = [...blocks];

    const upperBlock = {...blocks[data.id - 1], id: data.id};
    const currentBlock = {...blocks[data.id], id: data.id - 1};
    updatedBlocks[data.id] = upperBlock;
    updatedBlocks[data.id - 1] = currentBlock;
    setBlocks(updatedBlocks);
  };

  const MoveDown = () => {
    if (last() === true) {
      return;
    }

    const updatedBlocks = [...blocks];

    const belowBlock = {...blocks[data.id + 1], id: data.id};
    const currentBlock = {...blocks[data.id], id: data.id + 1};
    updatedBlocks[data.id] = belowBlock;
    updatedBlocks[data.id + 1] = currentBlock;
    setBlocks(updatedBlocks);
  };

  return (
    <View style={styles({theme: theme}).block}>
      <View style={styles({theme: theme}).arrowView}>
        <CustomButtonWithIcon
          icon={() => (
            <Icon
              name="chevron-up"
              size={Resources.Sizes.BlockButtonsSize}
              color={
                first() === true
                  ? theme.colors.disabled
                  : theme.colors.black
              }
            />
          )}
          styles={styles({theme: theme})}
          onPress={MoveUp}
          disabled={first() === true}
        />
        <CustomButtonWithIcon
          icon={() => (
            <Icon
              name="chevron-down"
              size={Resources.Sizes.BlockButtonsSize}
              color={
                last() === true
                  ? theme.colors.disabled
                  : theme.colors.black
              }
            />
          )}
          styles={styles({theme: theme})}
          onPress={MoveDown}
          disabled={last() === true}
        />
      </View>
      <View style={styles({theme: theme}).card}>
        {type === Resources.BlockType.Image ? (
          <Image
            style={styles({theme: theme}).image}
            source={{uri: data.content.uri}}
            resizeMode="cover"
          />
        ) : type === Resources.BlockType.Video ? (
          <Text style={styles({theme: theme}).text}>Video</Text>
        ) : (
          <Text style={styles({theme: theme}).text}>{data?.content}</Text>
        )}
      </View>
      <View style={styles({theme: theme}).blockBtnView}>
        <CustomButtonWithIcon
          icon={() => <Icon name="trash" 
                            size={Resources.Sizes.BlockButtonsSize} 
                            color={theme.colors.black} />}
          styles={styles({theme: theme})}
          onPress={RemoveBlock}
        />
      </View>
    </View>
  );
};

export default GuideBlock;
