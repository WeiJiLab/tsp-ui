export const demoMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
