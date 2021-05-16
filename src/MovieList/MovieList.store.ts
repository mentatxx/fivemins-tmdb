import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_TOKEN, API_URL} from '../environment';
interface MovieItem {}

interface MovieListState {
  loading: boolean;
  loaded: boolean;
  page: number;
  text: string;
  error: string;
  data: MovieItem[];
}

const initialState: MovieListState = {
  loading: false,
  loaded: false,
  page: 1,
  text: '',
  error: '',
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
    nextSearchPage: state => {
      return Object.assign(state, {
        loading: true,
        page: state.page + 1,
        error: '',
      });
    },
    firstPageRetrieved: (state, action) => {
      return Object.assign(state, {
        loading: false,
        loaded: true,
        data: action.payload,
      });
    },
    nextPageRetrieved: (state, action) => {
      return Object.assign(state, {
        loading: false,
        loaded: true,
        page: action.payload.page,
        data: state.data.concat(action.payload.data),
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
    dispatch(initSearch(text));
    try {
      const response = await fetch(
        `${API_URL}/4/search/movie?query=${encodeURIComponent(text)}&page=1`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      dispatch(firstPageRetrieved(data));
      return data;
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  },
);

export const loadMore = createAsyncThunk(
  'movieList/loadMore',
  async (_, {dispatch, getState}) => {
    let {text, page} = getState() as MovieListState;
    page++;
    dispatch(nextSearchPage());
    try {
      const response = await fetch(
        `${API_URL}/4/search/movie?query=${encodeURIComponent(
          text,
        )}&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      dispatch(nextPageRetrieved({page, data}));
      return data;
    } catch (error) {
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
