import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice"
import scoreReducer  from "./scoreSlice";


export const store = configureStore({
    reducer : {
        question : questionReducer,
        score : scoreReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch