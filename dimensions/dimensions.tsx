import {Dimensions} from 'react-native';

export enum PropDimensions {
  fullWidth = Dimensions.get('window').width,
  tabWidth = Dimensions.get('window').width,
  tabHight = Dimensions.get('window').height * 0.1,
  buttonWidth = Dimensions.get('window').width * 0.85,
  buttonHight = Dimensions.get('window').height * 0.06,
  fullHight = Dimensions.get('window').height,
  favoriteHeaderHeight = Dimensions.get('window').height * 0.15,
  favoriteHeaderWidth = Dimensions.get('window').width * 0.85,
  favoriteWidth = Dimensions.get('window').width * 0.85,
  favoriteHeight = Dimensions.get('window').height * 0.08,
  trendsHeight = Dimensions.get('window').height * 0.8,
  maxModalHeight = Dimensions.get('window').height * 0.7,
  messageModalHeight = Dimensions.get('window').height * 0.15,
  inputContainerHight = Dimensions.get('window').height * 0.1,
  inputHight = Dimensions.get('window').height * 0.07,
  inputWidth = Dimensions.get('window').width * 0.85,
  chatHeaderHeight = Dimensions.get('window').height * 0.12,
  trackWidth = Dimensions.get('window').width * 0.85,
  trackHeight = Dimensions.get('window').width * 0.14,
}
