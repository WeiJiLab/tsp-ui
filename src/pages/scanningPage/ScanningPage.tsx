import React, { useEffect, useRef, useState } from 'react';
import { MainLayout } from '../../components';
import {
  Select,
  Space,
  Button,
  message,
  Upload,
  UploadProps,
  Progress,
  List,
  Typography,
} from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { authAxios } from '../../api';
import api from '../../api/api';
import styles from './ScanningPage.module.scss';

interface detailResult {
  result: string;
  timeStamp: string;
}
export const ScanningPage: React.FC = () => {
  const timer = useRef<any>();
  const [percent, setPercent] = useState<number>();
  const [fileType, setFileType] = useState<string>('0');
  const [statusData, setStatusData] = useState<[]>();

  const [stepsData, setStepsData] = useState<detailResult[]>();
  const [projectId, setProjectId] = useState<string>();
  const [buttonText, setButtonText] = useState<string>('开始扫描');
  const [scanStatus, setScanStatus] = useState<boolean>(true);
  const [downloadStatus, setDownloadStatus] = useState<boolean>(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const startScaning = async () => {
    setDownloadStatus(false);
    setStatusData([]);
    setStepsData([]);
    setPercent(0);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setButtonText('正在扫描');
    setScanStatus(false);
    const { data } = await authAxios.post(api.startScaning, {
      typeOption: fileType,
      projectName: '',
    });
    setProjectId(data);
    getDetail(data);
  };
  const stopScaning = async () => {
    await authAxios.post(api.stopScaning, {
      projectId: projectId,
      typeOption: fileType,
    });
    clearInterval(timer.current);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = false;
      return newLoadings;
    });
    setButtonText('开始扫描');
    setScanStatus(true);
  };
  const download = () => {
    authAxios.get(`${api.getReports}/${projectId}`);
  };
  const getDetail = (projectId: string) => {
    timer.current = setInterval(async () => {
      const { data } = await authAxios.get(`${api.getStageStatus}/${projectId}`);
      const status = data.map((item) => {
        return `${item.step} ${item.status}`;
      });
      setStatusData(status);
      const percent = Math.round((data.length / 6) * 100);
      setPercent(percent);
      const steps = (await authAxios.get(`${api.getSteps}/${projectId}`)).data.map((item) => {
        return { result: item.result, timeStamp: item.timeStamp };
      });
      setStepsData(steps);
      if (percent === 100) {
        clearInterval(timer.current);
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[0] = false;
          return newLoadings;
        });
        setButtonText('开始扫描');
        setScanStatus(true);
        setDownloadStatus(true);
      }
    }, 5000);
  };
  const props: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChange = (value: string) => {
    setFileType(value);
    setStatusData([]);
    setStepsData([]);
    setPercent(0);
    console.log(`selected ${value}`);
  };

  return (
    <MainLayout>
      <Space>
        <Select
          defaultValue={fileType}
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            { value: '0', label: '内核源码扫描' },
            { value: '1', label: '内核镜像扫描' },
            { value: '2', label: '其他' },
          ]}
          disabled={!scanStatus}
        />

        <Button type='primary' loading={loadings[0]} onClick={startScaning} disabled={!scanStatus}>
          {buttonText}
        </Button>
        <Button type='primary' onClick={stopScaning} disabled={scanStatus}>
          停止扫描
        </Button>
        <Button
          type='primary'
          icon={<DownloadOutlined />}
          onClick={download}
          disabled={!downloadStatus}
        />
      </Space>
      <div className={styles.upload}>
        <Space direction="vertical">
          <Upload {...props} maxCount={1} action={`${api.upload}/image`}>
            <Button icon={<UploadOutlined />}>上传内核镜像 </Button>
          </Upload>
          <Upload {...props} maxCount={1} action={`${api.upload}/map`}>
            <Button icon={<UploadOutlined />}>上传符号 </Button>
          </Upload>
          <Upload {...props} maxCount={1} action={`${api.upload}/defconfig`}>
            <Button icon={<UploadOutlined />}>上传编译参数 </Button>
          </Upload>
        </Space>
      </div>
      <Progress percent={percent} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
      <List
        grid={{ gutter: 0, column: 6 }}
        dataSource={statusData}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <List
        bordered
        split={false}
        size='small'
        dataSource={stepsData}
        renderItem={(item) => (
          <List.Item className={styles.item}>
            <Typography.Text>{item.timeStamp}</Typography.Text> {item.result}
          </List.Item>
        )}
      />
    </MainLayout>
  );
};
