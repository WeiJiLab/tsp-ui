import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findAppInfoById } from '../../../redux/appInfo/app-info-thunks';
import { TimeUtils } from '../../../common/utils/TimeUtils';

type MatchParams = {
  appInfoId: string;
};

export const DetailAppInfo: React.FC = () => {
  const { appInfoId } = useParams<MatchParams>();

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
          <h1>应用名称： {data.name}</h1>
          <h1>应用描述： {data.description}</h1>
          <h1>应用代码仓库： {data.repo}</h1>
          <h1>应用代码分支： {data.branch}</h1>
          <h1>应用代码仓库类型： {data.repoType}</h1>
          <h1>代码路径： {data.codePath}</h1>
          <h1>应用创建时间： {data.createdAt}</h1>
          <h1>时间格式化： {TimeUtils.formatDatetime(data.createdAt)}</h1>
          <h1>时间范围： {TimeUtils.dateFromNow(data.createdAt)}</h1>
        </>
      )}
    </MainLayout>
  );
};
