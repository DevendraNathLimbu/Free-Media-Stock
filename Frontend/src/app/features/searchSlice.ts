import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../App'


export type MediaType = 'Images' | 'Videos' | 'GIFs';

interface SearchState {
  imgQuery: string;
  gifQuery: string;
  activeTab: MediaType;
  results: Item[];
  loading: boolean;
  error: string | null;
  collectedUrl: string;
  currUser: object;
}

const initialState: SearchState = {
  imgQuery: '',
  gifQuery: '',
  activeTab: 'Images',
  results: [],
  loading: true,
  error: null,
  collectedUrl: '',
  currUser: {},
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setActiveTab(state, action: PayloadAction<MediaType>) {
      state.activeTab = action.payload;
    },
    setResults(state, action: PayloadAction<Item[]>) {
      state.results = [...state.results, ...action.payload];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setEmptyResults(state, action: PayloadAction<Item[]>) {
      state.results = action.payload;
    },
    setCollectedUrl(state, action: PayloadAction<string>){
      state.collectedUrl = action.payload;
    },
    setCurrUser(state, action: PayloadAction<object>){
      state.currUser = action.payload;
    },
    setImgQuery(state, action: PayloadAction<string>){
      state.imgQuery = action.payload;
    },
    setGifQuery(state, action: PayloadAction<string>){
      state.gifQuery = action.payload;
    }
  },
});

export const { setQuery, setActiveTab, setResults, setLoading, setError, setEmptyResults, setCollectedUrl, setCurrUser, setImgQuery, setGifQuery } = searchSlice.actions;
export default searchSlice.reducer;
