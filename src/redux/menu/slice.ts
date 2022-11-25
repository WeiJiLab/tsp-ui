import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  collapsed: boolean;
  themeMode: 'light' | 'dark';
}

const initialState: MenuState = {
  collapsed: false,
  themeMode: 'light',
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    switchCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    toggleThemeMode: (state) => {
      state.themeMode === 'dark' ? (state.themeMode = 'light') : (state.themeMode = 'dark');
    },
  },
  extraReducers: {},
});
