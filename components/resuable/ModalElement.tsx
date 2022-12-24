import React from 'react';
import {Modalize} from 'react-native-modalize';
import Colors from '../../assets/design/palette.json';

interface ModalElementType {
  children: JSX.Element | JSX.Element[] | string;
  modalizeRef: any;
}

const ModalElement: React.FC<ModalElementType> = ({children, modalizeRef}) => {
  return (
    <Modalize
      modalStyle={{backgroundColor: Colors.primary}}
      ref={modalizeRef}
      avoidKeyboardLikeIOS={true}
      snapPoint={250}
      closeSnapPointStraightEnabled={false}
      useNativeDriver={true}
      withOverlay={false}
      /* closeOnOverlayTap={true} */
    >
      {children}
    </Modalize>
  );
};

export default ModalElement;
