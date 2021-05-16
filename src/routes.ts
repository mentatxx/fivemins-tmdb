import {StackScreenProps} from '@react-navigation/stack';
import {MovieItem} from './MovieList/MovieList.store';

export enum Routes {
  list = 'movieList',
  details = 'movieDetails',
}

export type RootStackParamList = {
  [Routes.details]: MovieDetailsParams;
  [Routes.list]: undefined;
};

export type MovieDetailsParams = {item: MovieItem};

export type MovieListProps = StackScreenProps<RootStackParamList, Routes.list>;
export type MovieDetailsProps = StackScreenProps<
  RootStackParamList,
  Routes.details
>;
