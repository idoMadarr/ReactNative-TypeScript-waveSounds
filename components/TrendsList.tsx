import React from 'react';
import {Fragment} from 'react';
import TrendCard from './TrendCard';
import {randomDate} from '../utils/randomDate';
import {TrackType} from '../types/tracks';

interface TrendsListType {
  tracks: TrackType[];
}

const TrendsList: React.FC<TrendsListType> = ({tracks}) => {
  return (
    <Fragment>
      {tracks.map(({id, artist, title, rank, image}, index) => (
        <TrendCard
          key={id}
          artist={artist}
          title={title}
          release={randomDate()}
          rank={rank}
          imageUri={image}
          darkMode={index % 2 !== 0}
        />
      ))}
    </Fragment>
  );
};

export default TrendsList;
