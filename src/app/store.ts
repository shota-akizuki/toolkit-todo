import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import taskReducer from "../features/task/taskSlice";

//sliceをstoreに保存
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
