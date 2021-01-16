import React from "react";
//storeの中身を使うにはuseDispatchを使う（reduxかインポート）
import { useDispatch } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { createTask } from "../taskSlice";
//型定義
type Inputs = {
  taskTitle: string;
};

//?:は必ずしもそのpropsが渡されなくてもいい
type PropsTypes = {
  edit?: boolean;
};

const TaskForm: React.FC<PropsTypes> = ({ edit }) => {
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
  const handleEdit = (data: Inputs) => {
    console.log(data);
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task" : "New Task"}
          defaultValue={edit ? "defalutValue" : ""}
          variant="outlined"
          inputRef={register}
          name="taskTitle"
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              //何かデータを渡すわけでないので、
              type="button"
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
