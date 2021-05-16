import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MovieDetails from './src/screens/MovieDetails';
import MovieList from './src/screens/MovieList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={MovieList}
          options={{title: 'TMDB'}}
        />
        <Stack.Screen name="Details" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
