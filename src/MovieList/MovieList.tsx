import React, {useCallback, useState} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import Colors from '../3rdparty/Colors';
import SearchBar from './components/SearchBar';

interface MovieListProps {}

const MovieList: React.FC<MovieListProps> = () => {
  const performSearch = useCallback((text: string) => {}, []);
  const [title, setTitle] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        padding: 10,
      }}>
      <Text>Search across thousands movies</Text>
      <SearchBar onSearch={performSearch}></SearchBar>
    </View>
  );
};

export default MovieList;
