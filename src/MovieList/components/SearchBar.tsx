import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

interface SearchBarProps {
  onSearch: (text: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = React.memo(({onSearch}) => {
  const [text, setText] = useState('');
  const performSearch = () => onSearch && onSearch(text);
  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.Input}
        value={text}
        placeholder="Input movie's name"
        onChangeText={setText}
        onSubmitEditing={performSearch}></TextInput>
      <TouchableOpacity style={styles.Button} onPress={performSearch}>
        <FontAwesomeIcon icon={faSearch} size={30}></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
  },
  Input: {
    flex: 1,
    borderWidth: 0.5,
    padding: 10,
    paddingStart: 10,
    borderRadius: 4,
  },
  Button: {
    flex: 0,
    borderWidth: 0,
    alignSelf: 'center',
    marginLeft: 16,
    marginRight: 8,
  },
});

export default SearchBar;
