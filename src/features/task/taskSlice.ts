import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { title } from "process";
import { useSelector } from "react-redux";
import { AppThunk, RootState } from "../../app/store";

//ここ変数の定義ではなく型の指定
interface TaskState {
  //taskが何個あるの管理する
  idCount: number;
  //storeに保存するtaskの一覧。連想配列をオブジェクト型で定義？
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
      //...スプレッド構文→ググる
      state.tasks = [newTask, ...state.tasks];
    },
  },
});

//本来はactionsは別で定義するが、toolkitのおかげでここに書ける
//task/createTaskという型が生成される
export const { createTask } = taskSlice.actions;

//useSelector(selectTask)でReactのコンポーネントに値を渡せる
export const selectTask = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export default taskSlice.reducer;

//これはcounterフォルダにあるcounteSlice.tsxのこぴぺ
