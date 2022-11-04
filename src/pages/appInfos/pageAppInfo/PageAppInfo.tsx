import React, { useEffect, useRef, useState } from "react";
import { ActionType, ProTable } from "@ant-design/pro-components";
import { useAppDispatch, useAppSelector, usePagination } from "../../../hooks";
import { pageAppInfo } from "../../../redux/appInfo/app-info-thunks";
import { refreshFinish } from "../../../redux/appInfo/app-info-actions";
import { columns } from "./config";
import { CreateAppInfo } from "../createAppInfo";

export const PageAppInfo: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const [params, setParams] = useState<any>(null);

  const {loading, data, isRefresh} = useAppSelector(state => state.appInfo);

  const { currentPage, pageSize, handleChangePagination, resetPagination } = usePagination();

  //设置页码
  const [totalCount, setTotalCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (data) {
      const {totalElements, content} = data;
      setTotalCount(totalElements);
      setDataSource(content);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage, params]);

  const fetchData = () => {
    return dispatch(pageAppInfo({page: currentPage, pageSize: pageSize, ...params}));
  }

  const handleReset = () => {
    console.log("handleReset.....");
    setParams(null);
    resetPagination();
  }

  if (isRefresh) {
    handleReset();
    fetchData();
    dispatch(refreshFinish())
  }

  return (
      <ProTable
          rowKey="key"
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
          dateFormatter="string"
          headerTitle="项目"
          toolBarRender={() => [
            <CreateAppInfo/>
          ]}>
      </ProTable>
  );
};
