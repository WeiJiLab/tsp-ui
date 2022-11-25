import { actionLog } from '../actionLog';

describe('action Login middleware test', () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = (action) => actionLog(store)(next)(action);
    return { store, next, invoke };
  };

  test('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
