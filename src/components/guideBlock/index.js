import {View, Text} from 'react-native';
import React from 'react';
import Resources from '../../Resources';
import styles from './styles';
import { Image } from 'react-native';
import CustomButtonWithIcon from '../customButtonWithIcon';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native';

const GuideBlock = ({data, id, blocksState, idState}) => {
    const type = data?.type;

    const first = () => data.id === 0;
    const last = () => data.id === blocks.at(-1)?.id

    const [blocks, setBlocks] = blocksState;
    const [currentId, setCurrentId] = idState;

    const RemoveBlock = () => {
        const blocksWithoutCurrent = blocks.filter(x => x.id !== data.id);
        blocksWithoutCurrent.forEach(x => {
            if (Number(x.id) > Number(data.id)) {
                x.id--;
            }
        })
        
        setBlocks(blocksWithoutCurrent);
        setCurrentId(prev => prev-1)
    }

    const MoveUp = () => {
        if(first() === true) {
            return;
        }

        const updatedBlocks = [...blocks];

        const upperBlock = {...blocks[data.id - 1], id: data.id};
        const currentBlock = {...blocks[data.id], id: data.id-1}
        updatedBlocks[data.id] = upperBlock;
        updatedBlocks[data.id - 1] = currentBlock;
        setBlocks(updatedBlocks);
    }

    const MoveDown = () => {
        if(last() === true) {
            return;
        }

        const updatedBlocks = [...blocks];

        const belowBlock = {...blocks[data.id + 1], id: data.id};
        const currentBlock = {...blocks[data.id], id: data.id+1}
        updatedBlocks[data.id] = belowBlock;
        updatedBlocks[data.id + 1] = currentBlock;
        setBlocks(updatedBlocks);
    }

    return (
        <View style={styles.block}>
            <View style={styles.arrowView}>
                {first() === false ? <CustomButtonWithIcon
                    icon={() => <Icon name='chevron-up' size={24} color='white'/>}
                    styles={styles}
                    onPress={MoveUp}/> : null}
                {last() === false ? <CustomButtonWithIcon
                    icon={() => <Icon name='chevron-down' size={24} color='white'/>}
                    styles={styles}
                    onPress={MoveDown}/> : null}
            </View>
            <View style={styles.card}>
                <Text style={{color: 'white'}}>{data?.id}</Text>
                {type === Resources.BlockType.Image ? 
                    <Image style={{width: '100%', height: '100%'}} source={{uri: data.content}} resizeMode='cover'/> 
                : type === Resources.BlockType.Video ? 
                    <Text style={styles.text}>Video</Text>
                : <Text style={styles.text}>{data?.content}</Text>}
            </View>
            <View style={styles.blockBtnView}>
                <CustomButtonWithIcon
                    icon={() => <Icon name='trash' size={24} color='white'/>}
                    styles={styles}
                    onPress={RemoveBlock}/>
            </View>
        </View>
        
    )
};

export default GuideBlock;
