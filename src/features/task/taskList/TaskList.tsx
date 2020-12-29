import React from "react";
import { useSelector } from "react-redux";
import { selectTask } from "../taskSlice";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = () => {
  //useSelectorを用いてReduxのstateに変数tasksに代入する
  const tasks = useSelector(selectTask);

  //TaskStateのtasks配列をmapで展開し、Itemに渡している。
  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
