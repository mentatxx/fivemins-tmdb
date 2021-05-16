import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {MovieItem} from '../MovieList.store';

const MovieListItem: React.FC<{item: MovieItem}> = React.memo(({item}) => (
  <View style={styles.Container}>
    <View style={styles.Image}>
      <Image
        style={{width: 120, height: 120}}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}></Image>
    </View>
    <View style={styles.Description}>
      <Text style={styles.Title}>{item.title}</Text>
      {!!item.vote_average && (
        <Text style={styles.Rating}>Rating: {item.vote_average}</Text>
      )}
    </View>
  </View>
));

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
