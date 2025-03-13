import { createSlice } from "@reduxjs/toolkit";


const bidSlice = createSlice({
    name: "bids",
    initialState: [],
    reducers: {
        setBids: (state, actions) => (state = actions.payload),
        removeBid:(state, actions) => (state = {}),
    },
});

export const { setBids } = bidSlice.actions;
export default bidSlice.reducer;
