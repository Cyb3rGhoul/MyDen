import { configureStore } from '@reduxjs/toolkit';

// We'll add these reducers later as we build features
// import authReducer from './slices/authSlice';
// import todoReducer from './slices/todoSlice';
// import calendarReducer from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // todo: todoReducer,
    // calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;