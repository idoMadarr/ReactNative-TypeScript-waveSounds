import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (screen: never | string, payload?: any) => {
  navigationRef.navigate(screen, payload);
};

export const getCurrentRoute = () => navigationRef.getCurrentRoute();

export const goBack = () => navigationRef.goBack();
