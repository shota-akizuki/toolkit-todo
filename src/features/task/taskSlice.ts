import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { skipPartiallyEmittedExpressions } from "typescript";
import { AppThunk, RootState } from "../../app/store";

//ここ変数の定義ではなく型の指定
interface TaskState {
  //taskが何個あるの管理する
  idCount: number;
  //storeに保存するtaskの一覧
  tasks: { id: number; title: string; completed: boolean }[];
  //taskを編集する際にどのtaskが選択されているのかを示すもの
  selectedTask: { id: number; title: string; completed: boolean };
  //Modalを開くかどうかを管理する
  isModalOpen: boolean;
}

//以下にstateの初期値を書く
const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "Task A", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  //先程定義したinitialStateの値を代入
  initialState,
  //どのようにstateを変更するのかロジック部分
  reducers: {
    //タスクを作成する
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      //...スプレッド構文
      state.tasks = [newTask, ...state.tasks];
    },
    //taskの編集
    editTask: (state, action) => {
      //state.tasksの中から編集したいtaskを抜き出す
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //抜き出したtaskのtitleを書き換える
        task.title = action.payload.title;
      }
    },
    //どのtaskを選択しているか 管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //Modalを開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    // task完了・未完了のチェックを変更
    completeTask: (state, action) => {
      //state.tasksの中から編集したいtaskを抜き出す
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //抜き出したtaskのcompletedを反転させる
        task.completed = !task.completed;
      }
    },
  },
});

//本来はactionsは別で定義するが、toolkitのおかげでここに書ける
//task/createTaskという型が生成される
export const {
  createTask,
  editTask,
  selectTask,
  handleModalOpen,
  completeTask,
} = taskSlice.actions;

//useSelector(selectTask)でReactのコンポーネントに値を渡せる
export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
