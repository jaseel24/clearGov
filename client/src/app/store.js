import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import bidReducer from "../features/bids/bidSlice";
import tenderReducer from "../features/tender/tenderSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        bids: bidReducer,
        tenders:tenderReducer
    },
});

export default store;
