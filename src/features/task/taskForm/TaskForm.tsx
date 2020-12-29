import React from "react";
//storeの中身を使うにはuseDispatchを使う（reduxかインポート）
import { useDispatch } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { createTask } from "../taskSlice";
type Inputs = {
  taskTitle: string;
};

const TaskForm: React.FC = () => {
  //useDispatch()を使うためにdispatchを定義
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    //storeに定義したcreateTaskを引数として、createTaskが発火
    //createTaskの引数にdata.taskTitleを指定すると、title:action.payloadに渡される。
    //state.tasksが更新され、新しいstateが定義される
    dispatch(createTask(data.taskTitle));
    reset();
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          inputRef={register}
          name="taskTitle"
          className={styles.text_field}
        />
      </form>
    </div>
  );
};

export default TaskForm;
