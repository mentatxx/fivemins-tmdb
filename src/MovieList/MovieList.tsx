import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../3rdparty/Colors';
import {MovieListProps, Routes} from '../routes';
import {RootState} from '../store';
import MovieListItem from './components/MovieListItem';
import SearchBar from './components/SearchBar';
import {loadMore, MovieItem, startSearch} from './MovieList.store';

const MovieList: React.FC<MovieListProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const performSearch = useCallback(
    (text: string) => {
      dispatch(startSearch(text));
    },
    [dispatch],
  );
  const loadNextPage = useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);
  const itemClickHandler = useCallback(
    (item: MovieItem) => {
      navigation.navigate(Routes.details, {item});
    },
    [navigation],
  );

  const isDarkMode = useColorScheme() === 'dark';
  const {data, error, loading} = useSelector(
    (state: RootState) => state.movieList,
  );
  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      padding: 10,
    }),
    [isDarkMode],
  );
  return (
    <View style={backgroundStyle}>
      <Text>Search across thousand movies</Text>
      <SearchBar onSearch={performSearch} />
      {!!error && <Text>Network error: {error}</Text>}
      <FlatList
        data={data}
        renderItem={i => (
          <MovieListItem item={i.item} onClick={itemClickHandler} />
        )}
        onEndReached={loadNextPage}
      />
      {!!loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
};

export default MovieList;
