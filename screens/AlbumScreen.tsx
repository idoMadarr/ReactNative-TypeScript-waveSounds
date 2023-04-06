import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/design/palette.json';
import {TrackType, AlbumType} from '../types/Types';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';

// Components
import AlbumHeader from '../components/AlbumPartials/AlbumHeader';
import AlbumTracks from '../components/AlbumPartials/AlbumTracks';
import StatusBarElement from '../components/resuable/StatusBarElement';

type RootStackParamList = {
  album: any;
};

type AlbumScreenType = NativeStackScreenProps<RootStackParamList, 'album'>;

const AlbumScreen: React.FC<AlbumScreenType> = ({navigation, route}) => {
  const albumData = route.params!.albumData as AlbumType;

  const [indexIndicator, setIndexIndicator] = useState(0);

  const onPlay = (item: TrackType, index: number) => {
    setIndexIndicator(index);
    const createFloatingTrack = new FloatingPlayerInstance(
      item.id,
      item.title,
      item.artist,
      item.image,
      item.preview!,
    );
    initSoundTrack(item.preview!, albumData?.tracks, createFloatingTrack);
  };

  const pressBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'light-content'}
        backgroundColor={Colors['gradient-start']}
      />
      <LinearGradient
        colors={[
          Colors['gradient-start'],
          Colors['gradient-end'],
          Colors['gradient-mid'],
        ]}>
        <View style={styles.main}>
          <AlbumHeader
            title={albumData.title}
            label={albumData.label}
            imageCover={albumData.image}
            name={albumData.artist}
            releaseDate={albumData.releaseDate}
            pressBack={pressBack}
          />
          <AlbumTracks
            tracks={albumData.tracks}
            onPlay={onPlay}
            indexIndicator={indexIndicator}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    alignSelf: 'center',
  },
});

export default AlbumScreen;
