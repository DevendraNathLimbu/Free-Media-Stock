import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../App'


export type MediaType = 'Images' | 'Videos' | 'GIFs';

interface SearchState {
  query: string;
  activeTab: MediaType;
  results: Item[];
  loading: boolean;
  error: string | null;
  collectedUrl: string;
}

const initialState: SearchState = {
  query: '',
  activeTab: 'Images',
  results: [],
  loading: true,
  error: null,
  collectedUrl: ''
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
    }
  },
});

export const { setQuery, setActiveTab, setResults, setLoading, setError, setEmptyResults, setCollectedUrl } = searchSlice.actions;
export default searchSlice.reducer;
