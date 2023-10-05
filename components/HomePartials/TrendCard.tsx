import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/design/palette.json';
import PlayIcon from '../../assets/vectors/play.svg';
import NoteIcon from '../../assets/vectors/note.svg';
import StarIcon from '../../assets/vectors/star.svg';

// Components
import TextElement from '../resuable/TextElement';
import LinearGradient from 'react-native-linear-gradient';

interface TrendCardType {
  artist: string;
  title: string;
  release: string;
  image: string;
  onPlay(): void;
}

const TrendCard: React.FC<TrendCardType> = ({
  artist,
  title,
  release,
  image,
  onPlay,
}) => {
  return (
    <View style={styles.item}>
      <Animated.View entering={FadeInLeft} style={styles.card}>
        <ImageBackground style={styles.bgCard} source={{uri: image}}>
          <LinearGradient
            colors={[Colors.transparent, '#000000be', Colors.black]}
            style={styles.flex}>
            <View style={styles.contentContainer}>
              <View style={{alignItems: 'center'}}>
                <TextElement
                  numberOfLines={2}
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  cStyle={styles.center}>
                  {title}
                </TextElement>
                <TextElement
                  fontWeight={'bold'}
                  cStyle={{color: Colors.greyish}}>
                  {`* ${artist} *`}
                </TextElement>
              </View>
              <View style={styles.controller}>
                <TouchableOpacity>
                  {/* <NoteIcon width={36} height={36} /> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={onPlay} style={styles.playButton}>
                  <PlayIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                  {/* <StarIcon width={36} height={36} /> */}
                </TouchableOpacity>
              </View>
              <TextElement
                cStyle={styles.center}
                fontSize={'sm'}>{`Realese on ${release}`}</TextElement>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    width: PropDimensions.fullWidth,
  },
  card: {
    width: PropDimensions.cardWidth,
    height: PropDimensions.cardHeight,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: Colors.black,
    overflow: 'hidden',
  },
  bgCard: {
    width: '100%',
    height: '90%',
  },
  contentContainer: {
    height: '65%',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '-12%',
    alignSelf: 'center',
  },
  controller: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    marginHorizontal: 24,
    backgroundColor: Colors.dark,
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
});

export default TrendCard;
