import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../App'


export type MediaType = 'Images' | 'Videos' | 'GIFs' | 'collection';

export type currUserType = {
  urls: [string];
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface SearchState {
  imgQuery: string;
  gifQuery: string;
  activeTab: MediaType;
  imgData: Item[];
  gifData: Item[];
  loading: boolean;
  error: string | null;
  collectedUrl: string;
  currUser: currUserType;
  gifValue: string;
  imgValue: string;
}

const initialState: SearchState = {
  imgQuery: '',
  gifQuery: '',
  activeTab: 'Images',
  imgData: [],
  gifData: [],
  loading: false,
  error: null,
  collectedUrl: '',
  currUser: { urls: [''], _id: '', username: '', createdAt: '', updatedAt: '' },
  gifValue: 'abc',
  imgValue: 'abc'
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<MediaType>) {
      state.activeTab = action.payload;
    },
    setImgData(state, action: PayloadAction<Item[]>) {
      state.imgData = [...state.imgData, ...action.payload];
    },
    setGifData(state, action: PayloadAction<Item[]>) {
      state.gifData = [...state.gifData, ...action.payload];
    },
    setEmptyGifData(state, action: PayloadAction<Item[]>) {
      state.gifData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setEmptyImgData(state, action: PayloadAction<Item[]>) {
      state.imgData = action.payload;
    },
    setCollectedUrl(state, action: PayloadAction<string>){
      state.collectedUrl = action.payload;
    },
    setCurrUser(state, action: PayloadAction<currUserType>){
      state.currUser = action.payload;
    },
    setImgQuery(state, action: PayloadAction<string>){
      state.imgQuery = action.payload;
    },
    setGifQuery(state, action: PayloadAction<string>){
      state.gifQuery = action.payload;
    },
    setGifValue(state, action: PayloadAction<string>){
      state.gifValue = action.payload;
    },
    setImgValue(state, action: PayloadAction<string>){
      state.imgValue = action.payload;
    }
  },
});

export const { setActiveTab, setImgData, setLoading, setError, setEmptyImgData, setCollectedUrl, setCurrUser, setImgQuery, setGifQuery, setGifData, setEmptyGifData, setGifValue, setImgValue } = searchSlice.actions;
export default searchSlice.reducer;
