import MockAdapter from 'axios-mock-adapter';

import { appInfoSlice, AppInfoState } from '../app-info-slice';
import { refreshPage, refreshFinish } from '../app-info-actions';
import { mockAppInfoPageResponse } from '../../../../__mocks__';
import rootStore from '../../store';
import { BASE_APP_INFO, pageAppInfo } from '../app-info-thunks';
import { configureStore } from '@reduxjs/toolkit';

import { config } from '../../../common';
import { axiosAuthInstance } from '../../../api';

describe('appInfo action tests', () => {
  const reducer = appInfoSlice.reducer;

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      isRefresh: false,
      loading: false,
      data: null,
    });
  });

  test('should refresh page', () => {
    const previousState: AppInfoState = { isRefresh: false, loading: false, data: null };

    expect(reducer(previousState, refreshPage())).toEqual({
      isRefresh: true,
      loading: false,
      data: null,
    });
  });

  test('should refresh finish', () => {
    const previousState: AppInfoState = { isRefresh: true, loading: false, data: null };

    expect(reducer(previousState, refreshFinish())).toEqual({
      isRefresh: false,
      loading: false,
      data: null,
    });
  });
});

describe('appInfo slice tests ', () => {
  let state = rootStore.store.getState().appInfo;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axiosAuthInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should pageAppInfo dispatches fulfilled on success', async () => {
    const store = configureStore({ reducer: appInfoSlice.reducer });

    expect(state.loading).toEqual(false);
    expect(state.data).toEqual(null);

    const url = config.api.API_URL + BASE_APP_INFO + '?page=0&size=10';
    mock.onGet(url).reply(200, mockAppInfoPageResponse);

    const result = await store.dispatch(pageAppInfo({ page: 0, size: 10 }));

    state = store.getState();

    expect(result.type).toBe('appInfo/pageAppInfo/fulfilled');
    expect(state.loading).toEqual(false);
    expect(state.data).toEqual(mockAppInfoPageResponse);
  });
});
