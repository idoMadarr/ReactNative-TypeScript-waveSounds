import {Dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';
import {
  setCurrentAlbum,
  setDeezerChart,
  setSequence,
} from '../slices/deezerSlice';
import {sequenceMap} from '../../fixtures/sequence-map.json';
import {toggleSpinner} from '../slices/authSlice';
import {navigate} from '../../utils/rootNavigation';

export const fetchDeezerChart = () => async (dispatch: Dispatch) => {
  const {data} = await axios.get(`${Config.deezer_api}chart`);
  const trends = data.tracks.data.map((trend: any) => ({
    id: trend.id,
    artist: trend.artist.name,
    title: trend.title,
    rank: trend.rank,
    image: trend.album.cover_medium,
    album: trend.album.title,
    preview: trend.preview,
  }));

  const artists = data.artists.data.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    link: artist.link,
    image: artist.picture_medium,
  }));

  dispatch(setDeezerChart({trends, artists}));
};

export const fetchSequences = () => async (dispatch: Dispatch) => {
  sequenceMap.forEach(async sequence => {
    const {data} = await axios.get(`${Config.deezer_api}chart/${sequence.id}`);
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

export const fetchAlbum = (albumId: string) => async (dispatch: Dispatch) => {
  const {data} = await axios.get(`${Config.deezer_api}album/${albumId}`);
  const formattedData = {
    title: data.title,
    artist: data.artist.name,
    image: data.cover_medium,
    label: data.label,
    releaseDate: data.release_date,
    tracks: data.tracks.data.map((track: any) => ({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist.name,
      image: data.cover_medium,
      preview: track.preview,
    })),
  };
  dispatch(toggleSpinner());
  await dispatch(setCurrentAlbum(formattedData));
  navigate('main', {screen: 'album'});
};

export const fetchSerchResults =
  (query: string) => async (dispatch: Dispatch) => {
    const {data} = await axios.get(`${Config.deezer_api}search?q=${query}`);
    if (data.data.length) {
      const formattedResults = data.data.map((result: any) => ({
        id: result.id,
        title: result.title,
        artist: result.artist.name,
        rank: result.rank,
        image: result.album.cover_medium,
        preview: result.preview,
      }));
      return formattedResults.slice(0, 15);
    }
  };
