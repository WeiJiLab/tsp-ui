import React from 'react';

import { MenuProps } from 'antd';

import {
  faFileSignature,
  faHeartCircleMinus,
  faHome,
  faListAlt,
  faShieldAlt,
  faShieldVirus,
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
  getItem('Home', 'HOME', faHome),
  getItem('Application', 'PROJECT_LIST', faHome),

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
  getItem('Security Service', 'SECURITY_TOOLS', faShieldAlt, [
    getItem('Request License Subscription', 'APP_INFO', faListAlt),
  ]),
  getItem('Security Regulations', 'USE_CASES', faFileSignature, [
    getItem('Secure Development Workflow', 'Security Development Process', faListAlt),
    getItem('Architecture Security Standards', 'Architecture Security Specifications', faListAlt),
    getItem('Data Security Standards', 'Data Security Specifications', faListAlt),
  ]),
  getItem('KPI Overview', '', faHeartCircleMinus),
  getItem('Vulnerability Scanning', 'SECURITY_SCAN', faShieldVirus),
];

export const MENU_NAVIGATE = new Map<string, string>([
  ['HOME', '/'],
  ['PROJECT_LIST', '/projects'],
  ['APP_INFO', '/app-infos'],
  ['SECURITY_SCAN', '/scanning'],
]);
