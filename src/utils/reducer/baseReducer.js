export const baseReducer = (state, action) => {
  return {
    ...state,
    [action.type]: [...state[action.type], action.payload],
  };
};

export const formReducer = (state, action) => {
  // field name and value are retrieved from event.target
  const { type, payload } = action;
  // merge the old and new state
  return {
    ...state,
    [type]: payload,
  };
};

export const stateReducer = (state, action) => {
  const { type, payload } = action;
  return {
    ...state,
    [type]: payload,
  };
};
