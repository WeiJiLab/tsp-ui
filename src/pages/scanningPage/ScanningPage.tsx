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
import { config, getToken } from '../../common';
import { useTranslation } from 'react-i18next';

interface detailResult {
  result: string;
  timeStamp: string;
}

export const ScanningPage: React.FC = () => {
  const timer = useRef<any>();
  const [percent, setPercent] = useState<number>();
  const [fileType, setFileType] = useState<string>('0');
  const [statusData, setStatusData] = useState<[]>();

  const { t } = useTranslation();

  const [stepsData, setStepsData] = useState<detailResult[]>();
  const [projectId, setProjectId] = useState<string>();
  const [buttonText, setButtonText] = useState<string>('' + t('scanning_page.start_scan'));
  const [scanStatus, setScanStatus] = useState<boolean>(true);
  const [downloadStatus, setDownloadStatus] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

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
    setButtonText('' + t('scanning_page.scanning'));
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
    setButtonText('' + t('scanning_page.start_scan'));
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
        setButtonText('' + t('scanning_page.start_scan'));
        setScanStatus(true);
        setDownloadStatus(true);
      }
    }, 5000);
  };
  const props: UploadProps = {
    name: 'file',
    headers: {
      authorization: config.api.TOKEN_SUFFIX + getToken(),
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
    if (value === '1') {
      setUpload(true);
    } else {
      setUpload(false);
    }
  };

  return (
    <MainLayout>
      <Space>
        <Select
          defaultValue={fileType}
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            { value: '0', label: t('scanning_page.kernel_source_code_scan') },
            { value: '1', label: t('scanning_page.kernel_image_scan') },
            { value: '2', label: t('scanning_page.other') },
          ]}
          disabled={!scanStatus}
        />

        <Button type='primary' loading={loadings[0]} onClick={startScaning} disabled={!scanStatus}>
          {buttonText}
        </Button>
        <Button type='primary' onClick={stopScaning} disabled={scanStatus}>
          {t('scanning_page.stop_scan')}
        </Button>
        <Button
          type='primary'
          icon={<DownloadOutlined />}
          onClick={download}
          disabled={!downloadStatus}
        />
      </Space>
      {upload && (
        <div className={styles.upload}>
          <Space direction='vertical'>
            <Upload {...props} maxCount={1} action={`${api.upload}/image`}>
              <Button icon={<UploadOutlined />}> {t('scanning_page.upload_kernel_image')}</Button>
            </Upload>
            <Upload {...props} maxCount={1} action={`${api.upload}/map`}>
              <Button icon={<UploadOutlined />}>{t('scanning_page.upload_symbol')} </Button>
            </Upload>
            <Upload {...props} maxCount={1} action={`${api.upload}/defconfig`}>
              <Button icon={<UploadOutlined />}>
                {t('scanning_page.upload_compile_parameters')}{' '}
              </Button>
            </Upload>
          </Space>
        </div>
      )}
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
