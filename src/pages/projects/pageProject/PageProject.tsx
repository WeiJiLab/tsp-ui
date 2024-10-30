import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { CreateProject } from '../createProject';
import { useAppDispatch, useAppSelector, usePagination } from '../../../hooks';
import { pageProjects } from '../../../redux/project/project-thunks';
import { columns } from './config';
import { projectSlice } from '../../../redux/project/project-slice';

export const PageProject: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const dispatch = useAppDispatch();

  const [params, setParams] = useState<any>(null);

  const loading = useAppSelector((state) => state.project.loading);
  const data = useAppSelector((state) => state.project.data);

  const isRefresh = useAppSelector((state) => state.project.isRefresh);

  const { currentPage, pageSize, handleChangePagination, resetPagination } = usePagination();

  // 设置页码
  const [totalCount, setTotalCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (data) {
      const { totalElements, content } = data;
      setTotalCount(totalElements);
      setDataSource(content);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage, params]);

  const fetchData = () => {
    return dispatch(pageProjects({ page: currentPage, pageSize: pageSize, ...params }));
  };

  const handleReset = () => {
    console.log('handleReset.....');
    setParams(null);
    resetPagination();
  };

  if (isRefresh) {
    handleReset();
    fetchData();
    dispatch(projectSlice.actions.refreshFinish());
  }

  return (
    <ProTable
      rowKey='key'
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        await fetchData().unwrap();
        return {
          data: dataSource,
          success: true,
          total: totalCount,
        };
      }}
      scroll={{
        x: 1300,
      }}
      onSubmit={(params) => {
        setParams(params);
      }}
      onReset={() => handleReset()}
      pagination={{
        current: currentPage + 1,
        total: totalCount,
        pageSize: pageSize,
        showSizeChanger: true,
        onChange: handleChangePagination,
      }}
      dateFormatter='string'
      headerTitle='Project'
      toolBarRender={() => [<CreateProject key={1} />]}
    ></ProTable>
  );
};
