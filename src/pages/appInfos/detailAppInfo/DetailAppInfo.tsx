import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findAppInfoById } from '../../../redux/appInfo/app-info-thunks';
import { TimeUtils } from '../../../common/utils/TimeUtils';
import { useTranslation } from 'react-i18next';

type MatchParams = {
  appInfoId: string;
};

export const DetailAppInfo: React.FC = () => {
  const { appInfoId } = useParams<MatchParams>();
  const { t } = useTranslation();

  const { loading, data } = useAppSelector((state) => state.appInfo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appInfoId != null) {
      dispatch(findAppInfoById(appInfoId));
    }
  }, []);

  return (
    <MainLayout loading={loading}>
      {data && (
        <>
          <h1>{t('app_page.detail.application_name')}： {data.name}</h1>
          <h1>{t('app_page.detail.application_description')}： {data.description}</h1>
          <h1>{t('app_page.detail.application_code_repo')}： {data.repo}</h1>
          <h1>{t('app_page.detail.application_code_branch')}： {data.branch}</h1>
          <h1>{t('app_page.detail.application_code_repo_type')}： {data.repoType}</h1>
          <h1>{t('app_page.detail.code_path')}： {data.codePath}</h1>
          <h1>{t('app_page.detail.application_create_time')}： {data.createdAt}</h1>
          <h1>{t('app_page.detail.application_time_format')}： {TimeUtils.formatDatetime(data.createdAt)}</h1>
          <h1>{t('app_page.detail.time_range')}： {TimeUtils.dateFromNow(data.createdAt)}</h1>
        </>
      )}
    </MainLayout>
  );
};
