import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_SECRET, API_URL} from '../environment';
import {RootState} from '../store';

export interface MovieItem {
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
}

interface MovieListState {
  loading: boolean;
  loaded: boolean;
  page: number;
  text: string;
  error: string;
  totalPages: number;
  data: MovieItem[];
}

const initialState: MovieListState = {
  loading: false,
  loaded: false,
  page: 1,
  text: '',
  error: '',
  totalPages: 1,
  data: [],
};

export const MovieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    initSearch: (state, action) => {
      return Object.assign(state, {
        loading: true,
        loaded: false,
        page: 1,
        text: action.payload,
        error: '',
        data: [],
      });
    },
    firstPageRetrieved: (state, action) => {
      return Object.assign(state, {
        loading: false,
        loaded: true,
        data: action.payload.results,
        totalPages: action.payload.total_pages,
      });
    },
    //
    nextSearchPage: state => {
      return Object.assign(state, {
        loading: true,
        error: '',
      });
    },
    nextPageRetrieved: (state, action) => {
      return Object.assign(state, {
        loading: false,
        loaded: true,
        page: action.payload.data.page,
        data: state.data.concat(action.payload.data.results),
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

export const startSearch = createAsyncThunk(
  'movieList/startSearch',
  async (text: string, {dispatch}) => {
    if (!text || !text.trim()) {
      return;
    }
    dispatch(initSearch(text));
    const url = `${API_URL}/3/search/movie?query=${encodeURIComponent(
      text,
    )}&api_key=${API_SECRET}&page=1`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const data = await response.json();
      dispatch(firstPageRetrieved(data));
      return data;
    } catch (error) {
      console.error(url, error);
      dispatch(setError((error as Error).message));
    }
  },
);

export const loadMore = createAsyncThunk(
  'movieList/loadMore',
  async (_, {dispatch, getState}) => {
    let {text, page, totalPages} = (getState() as RootState).movieList;
    page++;
    if (page > totalPages) {
      return;
    }
    dispatch(nextSearchPage());
    try {
      const url = `${API_URL}/3/search/movie?query=${encodeURIComponent(
        text,
      )}&api_key=${API_SECRET}&page=${page}`;
      const response = await fetch(url, {
        method: 'GET',
      });
      const data = await response.json();
      dispatch(nextPageRetrieved({page, data}));
      return data;
    } catch (error) {
      console.error(error);
      dispatch(setError((error as Error).message));
    }
  },
);

export const {
  initSearch,
  nextSearchPage,
  firstPageRetrieved,
  nextPageRetrieved,
  setError,
} = MovieListSlice.actions;
