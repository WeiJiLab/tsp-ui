import React from "react";
import { TaskItemCard } from "../card";

interface PropsTypes {
  task: any,
  key: any
}

const ScanTaskList: React.FC<PropsTypes> = (
    {
      task,
      key
    }
) => {
  return (
      <TaskItemCard task={task} key={key}/>
  )
}


export default ScanTaskList;
