import React, {useState, useCallback} from 'react';
import {ScrollView} from 'react-native';
import FavoriteItem from './FavoriteItem';
import {TrackType} from '../../types/TrackType';
import {useAppDispatch} from '../../redux/hooks';
import {updateFavorites} from '../../redux/slices/authSlice';

interface FavoritesListPropsType {
  favorites: TrackType[];
  onPlay(item: TrackType): void;
}

const FavoritesList: React.FC<FavoritesListPropsType> = ({
  favorites,
  onPlay,
}) => {
  const [indexIndicator, setIndexIndicator] = useState(0);
  const dispatch = useAppDispatch();

  const onRemove = useCallback((id: string | number) => {
    dispatch(updateFavorites(id));
  }, []);

  const onSelect = useCallback((index: number, track: TrackType) => {
    setIndexIndicator(index);
    onPlay(track);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {favorites.map((favorite, index) => (
        <FavoriteItem
          key={favorite.id}
          favorite={favorite}
          index={index}
          indexIndicator={indexIndicator}
          onSelect={onSelect.bind(this, index, favorite)}
          onRemove={onRemove.bind(this, favorite.id)}
        />
      ))}
    </ScrollView>
  );
};

export default FavoritesList;
