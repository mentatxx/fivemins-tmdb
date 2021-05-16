import React, {useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {MovieItem} from '../MovieList.store';

const getMoviePicture = (item: MovieItem) =>
  item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png';

const MovieListItem: React.FC<{
  item: MovieItem;
  onClick: (item: MovieItem) => void;
}> = React.memo(({item, onClick}) => {
  const clickHandler = useCallback(() => {
    onClick && onClick(item);
  }, [item]);
  return (
    <TouchableWithoutFeedback onPress={clickHandler}>
      <View style={styles.Container}>
        <View style={styles.Image}>
          <Image
            style={{width: 120, height: 120}}
            source={{
              uri: getMoviePicture(item),
            }}></Image>
        </View>
        <View style={styles.Description}>
          <Text style={styles.Title}>{item.title}</Text>
          {!!item.vote_average && (
            <Text style={styles.Rating}>Rating: {item.vote_average}</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  Container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  Image: {
    flexBasis: 120,
    flex: 0,
  },
  Description: {
    flex: 1,
    marginLeft: 10,
  },
  Title: {
    fontSize: 20,
    color: '#300',
  },
  Rating: {
    fontSize: 14,
    color: '#777',
  },
});

export default MovieListItem;
