import React from "react";
//storeの中身を使うにはuseDispatchを使う（reduxかインポート）
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import {
  createTask,
  editTask,
  handleModalOpen,
  selectSelectedTask,
} from "../taskSlice";
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
  //storeに保存されているselectedTaskが代入される
  const selectedTask = useSelector(selectSelectedTask);
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    //storeに定義したcreateTaskを引数として、createTaskが発火
    //createTaskの引数にdata.taskTitleを指定すると、title:action.payloadに渡される。
    //state.tasksが更新され、新しいstateが定義される
    dispatch(createTask(data.taskTitle));
    reset();
  };
  const handleEdit = (data: Inputs) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
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
          defaultValue={edit ? selectedTask.title : ""}
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
              type="button"
              onClick={() => dispatch(handleModalOpen(false))}
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
