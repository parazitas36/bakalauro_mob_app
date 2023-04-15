import React, {useState} from 'react';
import { View } from 'react-native';
import {Modal, TextInput} from 'react-native';
import Resources from '../../Resources';
import CustomButton from '../customButton';
import styles from './styles';

const TextInputModal = ({visibleState, blocksState, idState}) => {
  const [textInputVisible, setTextInputVisible] = visibleState
  const [text, setText] = useState(null);
  const [currentId, setCurrentId] = idState;
  const [blocks, setBlocks] = blocksState

  const ConfirmClick = () => {
    const block = {
        id: currentId,
        type: Resources.BlockType.Text,
        content: text
    };

    setBlocks(prev => [...prev, block]);
    setCurrentId(prev => prev+1)
    setText(null);
    setTextInputVisible(false);
  }

  const CancelClick = () => {
    setText(null);
    setTextInputVisible(false);
  }

  return (
    <Modal transparent={true} animationType="fade" visible={textInputVisible}>
        <View style={styles.modal}>
            <TextInput
            multiline={true}
            placeholder='Enter a text' style={styles.textInput} value={text} onChangeText={setText} />
            <View style={styles.flexRow}>
                <CustomButton styles={styles} btnText={'Confirm'} onPress={ConfirmClick}/>
                <CustomButton styles={styles} btnText={'Cancel'} onPress={CancelClick}/>
            </View>
        </View>
    </Modal>
  );
};

export default TextInputModal;
