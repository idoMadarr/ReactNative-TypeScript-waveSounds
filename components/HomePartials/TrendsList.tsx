import React, {Fragment} from 'react';
import {randomDate} from '../../utils/randomDate';
import {TrackType} from '../../types/Types';
import {FloatingPlayerInstance} from '../../models/FloatingPlayerInstance';
import {initSoundTrack} from '../../utils/soundTracker';

// Components
import TrendCard from './TrendCard';

interface TrendsListType {
  trends: TrackType[];
}

const TrendsList: React.FC<TrendsListType> = ({trends}) => {
  const onPlay = (
    id: string,
    image: string,
    title: string,
    artist: string,
    preview: string,
  ) => {
    const createFloatingTrack = new FloatingPlayerInstance(
      id,
      title,
      artist,
      image,
      preview,
    );

    initSoundTrack(preview, trends, createFloatingTrack);
  };

  return (
    <Fragment>
      {trends.map(({id, artist, title, image, preview}, index) => (
        <TrendCard
          key={id}
          artist={artist}
          title={title}
          release={randomDate()}
          image={image}
          onPlay={onPlay.bind(
            this,
            id.toString(),
            image,
            title,
            artist,
            preview!,
          )}
          darkMode={index % 2 !== 0}
        />
      ))}
    </Fragment>
  );
};

export default TrendsList;
