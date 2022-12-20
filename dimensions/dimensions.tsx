import {Dimensions} from 'react-native';

export enum PropDimensions {
  fullWidth = Dimensions.get('window').width,
  tabWidth = Dimensions.get('window').width * 0.9,
  cardWidth = Dimensions.get('window').width * 0.8,
  fullHight = Dimensions.get('window').height,
  cardHeight = Dimensions.get('window').height * 0.7,
  trendsHeight = Dimensions.get('window').height * 0.8,
}
