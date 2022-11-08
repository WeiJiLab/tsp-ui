import { Popconfirm } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../hooks";
import { refreshPage } from "../../../redux/appInfo/app-info-actions";
import { deleteAppInfoById } from "../../../redux/appInfo/app-info-thunks";

interface PropsTypes {
  id: number;
}

export const DeleteAppInfo: React.FC<PropsTypes> = ({id}) => {

  const dispatch = useAppDispatch();

  const deleteData = async (id: number) => {
    try {
      await dispatch(deleteAppInfoById({id})).unwrap();
      toast.success(`删除应用成功`);
      dispatch(refreshPage());
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
        <a href="src/pages/appInfos/deleteAppInfo/DeleteAppInfo#">删除</a>
      </Popconfirm>
  );
}
