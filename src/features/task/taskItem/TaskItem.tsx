import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EventNoteIcon from "@material-ui/icons/EventNote";
import styles from "./TaskItem.module.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import TaskForm from "../taskForm/TaskForm";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onClick={() => console.log("check${task.id}")}
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
      <Modal className={styles.modal} open={open} onClose={handleClose}>
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
