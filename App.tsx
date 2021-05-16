import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-redux';
import MovieDetails from './src/MovieDetails/MovieDetails';
import MovieList from './src/MovieList/MovieList';
import {Routes} from './src/routes';
import {store} from './src/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Routes.list}
            component={MovieList}
            options={{title: 'TMDB'}}
          />
          <Stack.Screen
            name={Routes.details}
            component={MovieDetails}
            options={{title: 'Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
