import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import teamsReducer from './reducers/teamsReducer';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    user: userReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
