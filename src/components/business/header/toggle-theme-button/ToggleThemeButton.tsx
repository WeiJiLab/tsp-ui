import React, { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { menuSlice } from '../../../../redux/menu/slice';

import ToggleSoundSrc from '../../../../assets/audio/toggle.mp3';
import SunIconSrc from '../../../../assets/icons/sun.png';
import MoonIconSrc from '../../../../assets/icons/moon.png';

import styles from './ToggleThemeButton.module.css';

import addMediaEffect from '../../../../common/utils/addMediaEffect';

export const ToggleThemeButton = () => {
  const themeMode = useAppSelector((state) => state.menu.themeMode);
  const dispatch = useAppDispatch();

  const onClick = useMemo(
    () =>
      addMediaEffect(
        (event) => {
          event.stopPropagation();
          dispatch(menuSlice.actions.toggleThemeMode());
        },
        ToggleSoundSrc,
        20,
      ),
    [dispatch],
  );

  return (
    <div
      style={
        themeMode === 'dark'
          ? {
              backgroundColor: '#67d6ed',
              boxShadow: '1px 1px 3px rgb(0 0 0 / 0.4)',
            }
          : {
              backgroundColor: '#1890ff',
              boxShadow: '1px 1px 3px rgb(0 0 0 / 0.1)',
            }
      }
      className={styles.buttonContainer}
      onClick={onClick}
    >
      <img src={SunIconSrc} width='24' alt='太阳' />
      <img src={MoonIconSrc} width='24' alt='月亮' />
      <div
        style={
          themeMode === 'dark'
            ? {
                backgroundColor: '#2f3031',
                left: '4px',
                transition: 'all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1)',
              }
            : {
                backgroundColor: '#f2f2f2',
                left: '40px',
                transition: 'all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1)',
              }
        }
        className={styles.buttonMarker}
      ></div>
    </div>
  );
};
