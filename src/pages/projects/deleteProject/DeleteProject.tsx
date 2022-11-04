import { Popconfirm } from "antd";
import React from "react";
import {  deleteProjectById } from "../../../redux/project/project-thunks";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../hooks";
import { projectSlice } from "../../../redux/project/project-slice";

interface PropsTypes {
  id: number;
}

export const DeleteProject: React.FC<PropsTypes> = ({id}) => {

  const dispatch = useAppDispatch();

  const deleteData = async (id: number) => {
    try {
      const project = await dispatch(deleteProjectById({id})).unwrap();
      toast.success(`删除项目成功`);
      dispatch(projectSlice.actions.refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  }

  return (
      <Popconfirm
          title="确定删除?"
          onConfirm={async () => {
            await deleteData(id);
          }}
          okText="是"
          cancelText="否"
      >
        <a href="#">删除</a>
      </Popconfirm>
  );
}
