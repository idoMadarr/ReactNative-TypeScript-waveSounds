import React from 'react';
import {Modalize} from 'react-native-modalize';
import Colors from '../../assets/design/palette.json';

interface ModalElementType {
  children: JSX.Element | JSX.Element[] | string;
  modalHeight: number;
  modalizeRef: any;
}

const ModalElement: React.FC<ModalElementType> = ({
  children,
  modalizeRef,
  modalHeight,
}) => {
  return (
    <Modalize
      modalStyle={{backgroundColor: Colors.primary}}
      ref={modalizeRef}
      avoidKeyboardLikeIOS={true}
      closeSnapPointStraightEnabled={false}
      useNativeDriver={true}
      closeOnOverlayTap={true}
      modalHeight={modalHeight}>
      {children}
    </Modalize>
  );
};

export default ModalElement;
