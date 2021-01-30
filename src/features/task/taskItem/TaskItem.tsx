import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import styles from "./TaskItem.module.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  selectTask,
  completeTask,
  handleModalOpen,
  selectIsModalOpen,
} from "../taskSlice";
import Modal from "@material-ui/core/Modal";
import TaskForm from "../taskForm/TaskForm";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  //Reactで管理されているisModalの状態をここで呼び出している
  const isModalOpen = useSelector(selectIsModalOpen);
  //dispatchの呼び出し
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_items}>
        <Checkbox
          checked={task.completed}
          onClick={() => dispatch(completeTask(task))}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={() => console.log("delete${task.id}")}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal className={styles.modal} open={isModalOpen} onClose={handleClose}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm
            //edit機能を持ったTaskFormだと示すためにedit propsを渡す
            edit
          />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
