import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ModalMessageType} from '../../types/Types';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import {onLogout} from '../../utils/onLogout';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextElement from '../resuable/TextElement';

interface ModalMessagePropsType {
  modalMessage: ModalMessageType[];
  closeMessageModal(): void;
}

const ModalMessage: React.FC<ModalMessagePropsType> = ({
  modalMessage,
  closeMessageModal,
}) => {
  const exit = async () => {
    await closeMessageModal();
    onLogout();
  };

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
      {modalMessage.map(({message, field}, index) => (
        <View key={index} style={styles.contentContainer}>
          <TextElement>{`- ${message}`}</TextElement>
          {field === 'logout' && (
            <TouchableOpacity onPress={exit} style={styles.logoutButton}>
              <TextElement
                fontSize={'sm'}
                fontWeight={'bold'}
                cStyle={styles.uppercase}>
                Logout
              </TextElement>
            </TouchableOpacity>
          )}
        </View>
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: {
    height: 40,
    paddingHorizontal: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.dark,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});

export default ModalMessage;
