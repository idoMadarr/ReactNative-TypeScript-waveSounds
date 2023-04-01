import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import FavoriteItem from './FavoriteItem';
import {TrackType} from '../../types/TrackType';
import {useAppDispatch} from '../../redux/hooks';
import {updateFavorites} from '../../redux/slices/authSlice';

interface FavoritesListPropsType {
  favorites: TrackType[];
}

const FavoritesList: React.FC<FavoritesListPropsType> = ({favorites}) => {
  const dispatch = useAppDispatch();

  const onRemove = useCallback((id: string | number) => {
    dispatch(updateFavorites(id));
  }, []);
  console.log(favorites);

  return (
    <ScrollView>
      {favorites.map((favorite, index) => (
        <FavoriteItem
          key={favorite.id}
          favorite={favorite}
          index={index}
          onRemove={onRemove.bind(this, favorite.id)}
        />
      ))}
    </ScrollView>
  );
};

export default FavoritesList;
