import { Popconfirm } from 'antd';
import React from 'react';
import { deleteProjectById } from '../../../redux/project/project-thunks';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../hooks';
import { projectSlice } from '../../../redux/project/project-slice';
import { useTranslation } from 'react-i18next';

interface PropsTypes {
  id: number;
}

export const DeleteProject: React.FC<PropsTypes> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const deleteData = async (id: number) => {
    try {
      await dispatch(deleteProjectById({ id })).unwrap();
      toast.success(t('app_page.delete.delete_project_success'));
      dispatch(projectSlice.actions.refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  return (
    <Popconfirm
      title={t('app_page.delete.confirm_delete')}
      onConfirm={async () => {
        await deleteData(id);
      }}
      okText={t('app_page.delete.yes')}
      cancelText={t('app_page.delete.no')}
    >
      <a href='#'>{t('app_page.delete.delete_text')}</a>
    </Popconfirm>
  );
};
