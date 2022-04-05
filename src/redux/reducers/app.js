const initialState = {
  isIdle: false,
  idleCount: 0,
  name: null,
};

const App = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'USER_ACTIVE': {
      return {...state, isIdle: false};
    }
    case 'USER_IDLE': {
      return {...state, isIdle: true};
    }
    case 'IDLE_COUNT': {
      return {...state, idleCount: state.idleCount++};
    }
    case 'SET_NAME': {
      return {...state, name: payload};
    }
    default: {
      return state;
    }
  }
};

export default App;
