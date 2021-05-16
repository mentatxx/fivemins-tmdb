import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MovieDetailsProps} from '../routes';
import {RootState} from '../store';
import {fetchDetails} from './MovieDetails.store';

const MovieDetails: React.FC<MovieDetailsProps> = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const {data, error, loaded, loading} = useSelector(
    (state: RootState) => state.movieDetails,
  );

  useEffect(() => {
    navigation.setOptions({title: item.title});
    dispatch(fetchDetails(item));
  }, [item, navigation, dispatch]);

  return (
    <View style={styles.Container}>
      <Image
        style={styles.Image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
      />
      <Text style={styles.Title}>{item.title}</Text>
      {!!item.vote_average && (
        <Text style={styles.Rating}>Rating: {item.vote_average}</Text>
      )}
      {!!loading && <ActivityIndicator size="large" color="#00ff00" />}
      {!!error && <Text>Network error: {error}</Text>}
      {!!(loaded && data) && (
        <View style={styles.Details}>
          {!!data.overview && (
            <Text style={styles.Overview}>{data.overview}</Text>
          )}
          {!!data.budget && (
            <Text style={styles.Budget}>
              Budget: {readableBudget(data.budget)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

function readableBudget(money: number) {
  const sizes = ['', 'K', 'M', 'B', 'T'];
  if (!money) {
    return '';
  }
  const i = Math.floor(Math.log(money) / Math.log(1000));
  return '$' + Math.round((money / Math.pow(1000, i)) * 100) / 100 + sizes[i];
}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },
  Image: {width: '100%', height: undefined, aspectRatio: 3 / 2},
  Title: {
    fontSize: 20,
    color: '#300',
  },
  Rating: {
    fontSize: 14,
    color: '#777',
  },
  Details: {
    marginTop: 20,
  },
  Overview: {
    fontSize: 20,
  },
  Budget: {
    color: '#e55',
  },
});

export default MovieDetails;
