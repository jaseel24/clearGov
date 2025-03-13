import { createSlice } from "@reduxjs/toolkit";

const tenderSlice = createSlice({
    name: "tenders",
    initialState:{},
    reducers: {
        addTenders: (state, actions) => (state = actions.payload),
        removeTenders:(state, actions) => (state = {}),
    },
});

export const { addTenders } = tenderSlice.actions;
export default tenderSlice.reducer;
