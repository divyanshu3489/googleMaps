import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './slice/routeSlice';

const store = configureStore({ 
    reducer: {
        route: routeReducer
    } 
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;