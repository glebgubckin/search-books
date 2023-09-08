import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: string;
  category: string;
  sortingMethod: string;
}

const initialState: InitialState = {
  value: "",
  category: "all",
  sortingMethod: "relevance",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    changeSortingMethod: (state, action: PayloadAction<string>) => {
      state.sortingMethod = action.payload;
    },
  },
});

export const { changeCategory, changeValue, changeSortingMethod } =
  searchSlice.actions;

export default searchSlice.reducer;
