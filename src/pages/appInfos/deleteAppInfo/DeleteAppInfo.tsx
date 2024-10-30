import { Popconfirm } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../hooks';
import { refreshPage } from '../../../redux/appInfo/app-info-actions';
import { deleteAppInfoById } from '../../../redux/appInfo/app-info-thunks';
import { useTranslation } from 'react-i18next';

interface PropsTypes {
  id: number;
}

export const DeleteAppInfo: React.FC<PropsTypes> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const deleteData = async (id: number) => {
    try {
      await dispatch(deleteAppInfoById({ id })).unwrap();
      toast.success(t('app_page.delete.delete_project_success'));
      dispatch(refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  return (
    <Popconfirm
      title={t('app_page.delete.confirm_delete') + '?'}
      onConfirm={async () => {
        await deleteData(id);
      }}
      okText={t('app_page.delete.yes')}
      cancelText={t('app_page.delete.no')}
    >
      <a href='src/pages/appInfos/deleteAppInfo/DeleteAppInfo#'>{t('app_page.delete.delete')}</a>
    </Popconfirm>
  );
};
