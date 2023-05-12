import React from 'react';
import { MainLayout } from '../../components';
import { Input, Button, Dropdown, MenuProps } from 'antd';
import styles from './GuidePage.module.scss';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
        3rd menu item
      </a>
    ),
  },
];

export const GuidePage: React.FC = () => {
  return (
    <MainLayout>
      <Search
        placeholder='input search text'
        allowClear
        enterButton='Search'
        // size='large'
        onSearch={onSearch}
      />
      <div className={styles.list}>
        {/* <Space style={{ width: '30%' }}> */}
        <Dropdown
          menu={{ items }}
          placement='bottomLeft'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>Compliance</Button>
        </Dropdown>
        <Dropdown
          menu={{ items }}
          placement='bottomLeft'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>Compliance</Button>
        </Dropdown>
        <Dropdown
          menu={{ items }}
          placement='bottomLeft'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>Compliance</Button>
        </Dropdown>
        {/* </Space> */}
        {/* <Space style={{ width: '30%' }}> */}
        <Dropdown
          menu={{ items }}
          placement='bottom'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>Security Policy</Button>
        </Dropdown>
        {/* </Space> */}

        {/* <Space style={{ width: '30%' }}> */}
        <Dropdown
          menu={{ items }}
          placement='bottomRight'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>bottomRight</Button>
        </Dropdown>
        {/* </Space> */}

        <Dropdown
          menu={{ items }}
          placement='topLeft'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown
          menu={{ items }}
          placement='top'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>top</Button>
        </Dropdown>
        <Dropdown
          menu={{ items }}
          placement='topRight'
          arrow={{ pointAtCenter: true }}
          className={styles.item}
        >
          <Button>topRight</Button>
        </Dropdown>
      </div>
    </MainLayout>
  );
};
