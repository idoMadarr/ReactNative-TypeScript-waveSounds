import {Dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setDeezerChart,
  // setCategories,
  setSequence,
} from '../slices/deezerSlice';
import {sequenceMap} from '../../fixtures/sequence-map.json';

export const fetchDeezerChart = () => async (dispatch: Dispatch) => {
  const {data} = await axios.get('https://api.deezer.com/chart');
  const trends = data.tracks.data.map((trend: any) => ({
    id: trend.id,
    artist: trend.artist.name,
    title: trend.title,
    rank: trend.rank,
    image: trend.album.cover_medium,
    album: trend.album.title,
  }));

  dispatch(setDeezerChart(trends));
};

// export const fetchCategories = () => async (dispatch: Dispatch) => {
//   const {data} = await axios.get('https://api.deezer.com/editorial');
//   dispatch(setCategories(data));
// };

export const fetchSequences = () => async (dispatch: Dispatch) => {
  sequenceMap.forEach(async sequence => {
    const {data} = await axios.get(
      `https://api.deezer.com/chart/${sequence.id}`,
    );
    dispatch(
      setSequence({
        name: sequence.name,
        albums: data.albums.data.map((album: any) => ({
          id: album.id,
          title: album.title,
          artist: album.artist.name,
          image: album.cover_medium,
        })),
      }),
    );
  });
};
