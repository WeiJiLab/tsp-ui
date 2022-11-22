import React from 'react'

import { MenuProps } from 'antd'

import {
  faCubes,
  faFileSignature,
  faHome,
  faListAlt,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type MenuItems = Required<MenuProps>['items'][number]

const fontAwesomeIcon = (icon: IconDefinition | undefined): React.ReactNode => {
  return icon ? <FontAwesomeIcon style={{ fontSize: '1em' }} icon={icon} /> : null
}

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
  } as MenuItems
}

export const MENU_ITEMS: MenuItems[] = [
  getItem('首页', 'HOME', faHome),
  getItem('应用', 'APP_INFO', faHome),
  getItem('项目', 'PROJECT', faCubes, [getItem('项目列表', 'PROJECT_LIST', faListAlt)]),
  getItem('安全工具', 'SECURITY_TOOLS', faShieldAlt, [
    getItem('工具列表', 'TOOLS_LIST', faListAlt),
  ]),
  getItem('安全用例', 'USE_CASES', faFileSignature),
]

export const MENU_NAVIGATE = new Map<string, string>([
  ['HOME', '/'],
  ['PROJECT_LIST', '/projects'],
  ['APP_INFO', '/app-infos'],
])
