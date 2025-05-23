import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api, apiReducer } from "./api.js";
import globalReducer from '../store/modeSlice';
import "react-datepicker/dist/react-datepicker.css";
const reducer = combineReducers({
    global: globalReducer,
    [api.reducerPath] : apiReducer,
})

console.log(api)
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),

})