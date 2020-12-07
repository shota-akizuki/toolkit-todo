import React from "react";
import { useSelector } from "react-redux";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = () => {
  // const { tasks } = useSelector((state: RootState) => state.task);
  return (
    <div className={styles.wrapper}>
      {/* {TaskList.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))} */}
    </div>
  );
};

export default TaskList;
