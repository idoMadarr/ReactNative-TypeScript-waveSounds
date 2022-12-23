import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';

interface ModalElementType {
  children: JSX.Element | JSX.Element[] | string;
  modalizeRef: any;
}

const ModalElement: React.FC<ModalElementType> = ({children, modalizeRef}) => {
  return (
    <Modalize
      // modalStyle={{  }}
      ref={modalizeRef}
      snapPoint={250}
      adjustToContentHeight={true}
      panGestureEnabled={true}
      useNativeDriver={true}
      closeOnOverlayTap={true}>
      {children}
    </Modalize>
  );
};

export default ModalElement;
