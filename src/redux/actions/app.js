export const idleCount = () => {
  return {
    type: 'IDLE_COUNT',
  };
};

export const userIdle = () => {
  return {
    type: 'USER_IDLE',
  };
};

export const userActive = () => {
  return {
    type: 'USER_ACTIVE',
  };
};

export const settingName = name => {
  return {
    type: 'SET_NAME',
    payload: name,
  };
};
