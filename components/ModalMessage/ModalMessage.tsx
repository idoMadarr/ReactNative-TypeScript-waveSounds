import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ModalMessageType} from '../../types/Types';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';

interface ModalMessagePropsType {
  modalMessage: ModalMessageType[];
}

const ModalMessage: React.FC<ModalMessagePropsType> = ({modalMessage}) => {
  return (
    <View style={styles.main}>
      <View style={styles.modalHeader}>
        <Icon
          name={'warning'}
          size={32}
          color={Colors.active}
          style={styles.icon}
        />
        <TextElement fontSize={'lg'} cStyle={styles.active}>
          Notice!
        </TextElement>
      </View>
      {modalMessage.map(({message}, index) => (
        <TextElement key={index}>{`- ${message}`}</TextElement>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    height: PropDimensions.messageModalHeight,
    padding: 16,
  },
  active: {
    color: Colors.active,
  },
  modalHeader: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  icon: {
    marginRight: 16,
  },
});

export default ModalMessage;
