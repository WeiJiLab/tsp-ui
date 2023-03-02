import React from 'react';

import { MenuProps } from 'antd';

import {
  faCubes,
  faFileSignature,
  faHeartCircleMinus,
  faHome,
  faListAlt,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type MenuItems = Required<MenuProps>['items'][number];

const fontAwesomeIcon = (icon: IconDefinition | undefined): React.ReactNode => {
  return icon ? <FontAwesomeIcon style={{ fontSize: '1em' }} icon={icon} /> : null;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: IconDefinition | undefined,
  children?: MenuItems[],
): MenuItems {
  return {
    label,
    key,
    icon: fontAwesomeIcon(icon),
    children,
  } as MenuItems;
}

export const MENU_ITEMS: MenuItems[] = [
  getItem('首页', 'HOME', faHome),
  getItem('应用', 'PROJECT_LIST', faHome),

  // [
  // getItem('基本信息/KPI', 'PROJECT_LIST', faListAlt),
  // getItem('架构安全审核', 'APP_INFO', faListAlt, [
  //   getItem('上传资料', 'APP_INFO', faListAlt),
  //   getItem('评论记录', '', faListAlt),
  //   getItem('安全问题列表', '', faListAlt),
  // ]),
  // getItem('渗透测试', '', faListAlt, [
  //   getItem('预约时间', '', faListAlt),
  //   getItem('渗透测试漏洞列表', '', faListAlt),
  // ]),
  // ]
  getItem('安全服务', 'SECURITY_TOOLS', faShieldAlt, [
    getItem('订阅license申请', 'APP_INFO', faListAlt),
  ]),
  getItem('安全规范', 'USE_CASES', faFileSignature, [
    getItem('安全开发流程', 'Security Development Process', faListAlt),
    getItem('架构安全规范', 'Architecture Security Specifications', faListAlt),
    getItem('数据安全规范', 'Data Security Specifications', faListAlt),
  ]),
  getItem('KPI总览', '', faHeartCircleMinus),
  getItem('安全漏扫', 'SECURITY_SCAN', faHeartCircleMinus),
];

export const MENU_NAVIGATE = new Map<string, string>([
  ['HOME', '/'],
  ['PROJECT_LIST', '/projects'],
  ['APP_INFO', '/app-infos'],
  ['SECURITY_SCAN', '/scanning'],
]);
