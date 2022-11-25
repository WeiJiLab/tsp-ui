import React, { useEffect, useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useAppDispatch, useAppSelector, usePagination } from '../../../hooks';
import { pageAppInfo } from '../../../redux/appInfo/app-info-thunks';
import { refreshFinish } from '../../../redux/appInfo/app-info-actions';
import { CreateAppInfo } from '../createAppInfo';
import { DatePicker } from 'antd';
import { AppInfoModel } from '../../../models';
import { UpdateAppInfo } from '../updateAppInfo';
import { DeleteAppInfo } from '../deleteAppInfo';
import { useNavigate } from 'react-router-dom';

export const PageAppInfo: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useState<any>(null);

  const { loading, data, isRefresh } = useAppSelector((state) => state.appInfo);

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
    return dispatch(pageAppInfo({ page: currentPage, pageSize: pageSize, ...params }));
  };

  const handleReset = () => {
    console.log('handleReset.....');
    setParams(null);
    resetPagination();
  };

  if (isRefresh) {
    handleReset();
    fetchData();
    dispatch(refreshFinish());
  }

  const { RangePicker } = DatePicker;

  const columns: ProColumns<AppInfoModel>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '应用描述',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
      tip: '项目描述过长会自动收缩',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '仓库类型',
      dataIndex: 'repoType',
      valueEnum: {
        GIT: { text: 'GIT' },
        LOCAL: { text: 'LOCAL' },
      },
    },
    {
      title: '代码目录',
      dataIndex: 'codePath',
      search: false,
    },
    {
      title: '创建时间',
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'date',
      search: false,
      renderFormItem: () => {
        return <RangePicker />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'date',
      search: false,
      hideInTable: false,
    },
    {
      width: 150,
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      render: (text, record, index, action) => [
        <UpdateAppInfo key={record.id} {...record} />,
        <a
          key={record.id}
          onClick={() => {
            console.log('text', text);
            console.log('record', record);
            console.log('index', index);
            console.log('action', action);
            // navigate(`/app-infos/`);
          }}
        >
          查看
        </a>,
        <DeleteAppInfo key={record.id} id={record.id} />,
      ],
    },
  ];

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
      headerTitle='项目'
      toolBarRender={() => [<CreateAppInfo key={1} />]}
    ></ProTable>
  );
};
