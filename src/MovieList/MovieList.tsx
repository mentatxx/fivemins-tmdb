import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../3rdparty/Colors';
import {RootState} from '../store';
import MovieListItem from './components/MovieListItem';
import SearchBar from './components/SearchBar';
import {loadMore, startSearch} from './MovieList.store';

interface MovieListProps {}

const MovieList: React.FC<MovieListProps> = () => {
  const dispatch = useDispatch();
  const performSearch = useCallback((text: string) => {
    dispatch(startSearch(text));
  }, []);
  const loadNextPage = useCallback(() => {
    dispatch(loadMore());
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  const {data, error, loaded, loading} = useSelector(
    (state: RootState) => state.movieList,
  );
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        padding: 10,
      }}>
      <Text>Search across thousands movies</Text>
      <SearchBar onSearch={performSearch}></SearchBar>
      {!!error && <Text>Network error: {error}</Text>}
      <FlatList
        data={data}
        renderItem={i => <MovieListItem item={i.item}></MovieListItem>}
        onEndReached={loadNextPage}></FlatList>
      {!!loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
};

export default MovieList;
