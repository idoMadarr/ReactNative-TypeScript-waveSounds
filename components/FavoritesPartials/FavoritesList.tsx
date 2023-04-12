import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FavoriteItem from './FavoriteItem';
import {TrackType} from '../../types/Types';
import {useAppDispatch} from '../../redux/hooks';
import {deleteFavorite} from '../../redux/actions/authAction';
import {PropDimensions} from '../../dimensions/dimensions';

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

  const onRemove = useCallback(
    (id: string | number) => {
      dispatch(deleteFavorite(id));
    },
    [favorites],
  );

  const onSelect = useCallback(
    (index: number, track: TrackType) => {
      setIndexIndicator(index);
      onPlay(track);
    },
    [favorites],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}>
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

const styles = StyleSheet.create({
  listContainer: {
    width: PropDimensions.favoriteWidth,
  },
});

export default FavoritesList;
