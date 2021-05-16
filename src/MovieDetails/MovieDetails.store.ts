import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_SECRET, API_URL} from '../environment';
import {MovieItem} from '../MovieList/MovieList.store';

export interface DetailedMovieItem {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;

  belongs_to_collection: any;
  budget: number;
  genres: {id: number; name: string}[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

interface MovieDetailsState {
  id?: string;
  loading: boolean;
  loaded: boolean;
  error: string;
  data?: DetailedMovieItem;
}

const initialState: MovieDetailsState = {
  id: undefined,
  loading: false,
  loaded: false,
  error: '',
  data: undefined,
};

export const MovieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    init: (state, action) => {
      return Object.assign(state, {
        id: action.payload,
        loading: true,
        loaded: false,
        error: '',
        data: undefined,
      });
    },
    dataRetrieved: (state, action) => {
      return Object.assign(state, {
        loading: false,
        loaded: true,
        data: action.payload,
      });
    },
    setError: (state, action) => {
      return Object.assign(state, {
        loading: false,
        loaded: true,
        error: action.payload,
      });
    },
  },
});

export const fetchDetails = createAsyncThunk(
  'movieDetails/fetchDetails',
  async (item: MovieItem, {dispatch}) => {
    dispatch(init(item.id));
    const url = `${API_URL}/3/movie/${item.id}?api_key=${API_SECRET}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const data = await response.json();
      dispatch(dataRetrieved(data));
      return data;
    } catch (error) {
      console.error(url, error);
      dispatch(setError((error as Error).message));
    }
  },
);

export const {init, dataRetrieved, setError} = MovieDetailsSlice.actions;
