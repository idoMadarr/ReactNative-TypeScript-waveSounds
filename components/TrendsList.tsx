import React, {Fragment} from 'react';
import TrendCard from './TrendCard';
import {randomDate} from '../utils/randomDate';
import {TrendType} from '../types/trend';

interface TrendsListType {
  trends: TrendType[];
}

const TrendsList: React.FC<TrendsListType> = ({trends}) => {
  return (
    <Fragment>
      {trends.map(({id, artist, title, rank, image}, index) => (
        <TrendCard
          key={id}
          artist={artist}
          title={title}
          release={randomDate()}
          rank={rank}
          imageUri={image}
          onPlay={() => {
            console.log(1);
          }}
          darkMode={index % 2 !== 0}
        />
      ))}
    </Fragment>
  );
};

export default TrendsList;
