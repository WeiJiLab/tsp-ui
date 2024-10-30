import React from 'react';

import { MenuProps } from 'antd';
import i18next from '../../../config/I18nConfigs'

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
  getItem(i18next.t('menu.home'), 'HOME', faHome),
  getItem(i18next.t('menu.application'), 'PROJECT_LIST', faHome),

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
  getItem(i18next.t('menu.security_services'), 'SECURITY_TOOLS', faShieldAlt, [
    getItem(i18next.t('menu.application_information'), 'APP_INFO', faListAlt),
  ]),
  getItem(i18next.t('menu.safety_regulations'), 'USE_CASES', faFileSignature, [
    getItem(i18next.t('menu.secure_development_process'), 'Security Development Process', faListAlt),
    getItem(i18next.t('menu.architecture_security_specifications'), 'Architecture Security Specifications', faListAlt),
    getItem(i18next.t('menu.data_security_regulations'), 'Data Security Specifications', faListAlt),
  ]),
  getItem(i18next.t('menu.kpi_overview'), '', faHeartCircleMinus),
  getItem(i18next.t('menu.vulnerability_scanning'), 'SECURITY_SCAN', faShieldVirus),
];

export const MENU_NAVIGATE = new Map<string, string>([
  ['HOME', '/'],
  ['PROJECT_LIST', '/projects'],
  ['APP_INFO', '/app-infos'],
  ['SECURITY_SCAN', '/scanning'],
]);
