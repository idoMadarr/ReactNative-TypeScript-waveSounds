import React, {Fragment} from 'react';
import {randomDate} from '../utils/randomDate';
import {TrackType} from '../types/TrackType';
import {FloatingPlayerInstance} from '../models/FloatingPlayerInstance';
import {initSoundTrack} from '../utils/soundTracker';

// Components
import TrendCard from './TrendCard';

interface TrendsListType {
  trends: TrackType[];
}

const TrendsList: React.FC<TrendsListType> = ({trends}) => {
  const onPlay = (
    image: string,
    title: string,
    artist: string,
    preview: string,
  ) => {
    const createFloatingTrack = new FloatingPlayerInstance(
      title,
      artist,
      image,
    );

    initSoundTrack(preview, trends, createFloatingTrack);
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
