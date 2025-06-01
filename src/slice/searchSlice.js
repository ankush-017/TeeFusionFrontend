import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: "",
    results: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword:  (state,action)=>{
            state.keyword = action.payload;
        },
        setResult: (state,action) => {
            state.results = action.payload;
        },
        clearSearch: (state,action) => {
            state.keyword = "";
            state.results = [];
        }
    }
})


export const {setKeyword,setResult,clearSearch} = searchSlice.actions;
export default searchSlice.reducer;