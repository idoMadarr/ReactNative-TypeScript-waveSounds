import React, {useState, useCallback} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import FavoriteItem from './FavoriteItem';
import {TrackType} from '../../types/Types';
import {useAppDispatch} from '../../redux/hooks';
import {deleteFavorite} from '../../redux/actions/authAction';
import {PropDimensions} from '../../dimensions/dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../assets/design/palette.json';

// Style
import TextElement from '../resuable/TextElement';

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
      {favorites.length ? (
        favorites.map((favorite, index) => (
          <FavoriteItem
            key={favorite.id}
            favorite={favorite}
            index={index}
            indexIndicator={indexIndicator}
            onSelect={onSelect.bind(this, index, favorite)}
            onRemove={onRemove.bind(this, favorite.id)}
          />
        ))
      ) : (
        <View style={styles.emptyListContainer}>
          <Icon name={'star'} size={56} color={Colors.greyish} />
          <TextElement>- Seach for your favorites tracks -</TextElement>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: PropDimensions.favoriteWidth,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.6,
  },
});

export default FavoritesList;
