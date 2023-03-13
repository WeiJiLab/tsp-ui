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
import { DownloadOutlined } from '@ant-design/icons';
import { authAxios } from '../../api';
import api from '../../api/api';
import styles from './ScanningPage.module.css';

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

  const { Dragger } = Upload;

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
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
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
      {/* <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger> */}
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
