/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
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
import { InboxOutlined } from '@ant-design/icons';
import { authAxios } from '../../api';

export const ScanningPage: React.FC = () => {
  const fileType = '0';
  const timer = useRef<any>();
  const [percent, setPercent] = useState<number>();
  const [stepsData, setStepsData] = useState<string[]>();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const { Dragger } = Upload;
  const enterLoading = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  const startScan = async () => {
    // enterLoading(0);
    const { data } = await authAxios.post('/image-scan/start', {
      type_option: fileType,
      pj_name: 'ab',
    });
    getDetail(data);
  };
  const getDetail = (projectId: string) => {
    timer.current = setInterval(async () => {
      const { data } = await authAxios.get(`/image-scan/stage-status/${projectId}`);
      const percent = Math.round((data.length / 6) * 100);
      setPercent(percent);
      const steps = (await authAxios.get(`/image-scan/steps/${projectId}`))['data'].map((item) => {
        return item.result;
      });
      setStepsData(steps);
      console.log(percent);
      if (percent === 100) clearInterval(timer.current);
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
    // setFileType(value);
    console.log(`selected ${value}`);
  };
  return (
    <MainLayout>
      <Space>
        <Select
          defaultValue={fileType}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: '0', label: '有源' },
            { value: '1', label: '无源' },
            { value: '2', label: '其他' },
          ]}
        />
        <Button type='primary' loading={loadings[0]} onClick={startScan}>
          启动扫描
        </Button>
      </Space>
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
      <Progress percent={percent} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
      <List
        header={<div></div>}
        footer={<div></div>}
        bordered
        dataSource={stepsData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark></Typography.Text> {item}
          </List.Item>
        )}
      />
    </MainLayout>
  );
};
