import React, {Fragment} from 'react';
import TrendCard from './TrendCard';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  setCurrentTrack,
  setFloatingPlayer,
  setModalPlayerContext,
} from '../redux/slices/deezerSlice';
import {randomDate} from '../utils/randomDate';
import {TrackType} from '../types/TrackType';
import Sound from 'react-native-sound';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';

interface TrendsListType {
  trends: TrackType[];
}

const TrendsList: React.FC<TrendsListType> = ({trends}) => {
  const currentTrack = useAppSelector(state => state.deezerSlice.currentTrack);

  const dispatch = useAppDispatch();

  const onPlay = (
    image: string,
    title: string,
    artist: string,
    preview: string,
  ) => {
    if (currentTrack) {
      currentTrack.stop();
    }

    const createFloatingTrack = new FloatingPlayerInstance(
      title,
      artist,
      image,
    );
    const loadTrack = new Sound(preview, '', async () => {
      dispatch(setModalPlayerContext(trends));
      dispatch(setFloatingPlayer(createFloatingTrack));
      dispatch(setCurrentTrack(loadTrack));
    });
  };

  return (
    <Fragment>
      {trends.map(({id, artist, title, rank, image, preview}, index) => (
        <TrendCard
          key={id}
          artist={artist}
          title={title}
          release={randomDate()}
          rank={rank || 1}
          image={image}
          onPlay={onPlay.bind(this, image, title, artist, preview)}
          darkMode={index % 2 !== 0}
        />
      ))}
    </Fragment>
  );
};

export default TrendsList;
