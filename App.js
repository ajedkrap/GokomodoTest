import React from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import MainStack from '_routes/mainStack';
import Redux from '_redux/store';

const App = () => {
  return (
    <>
      <Provider store={Redux.store}>
        <PersistGate persistor={Redux.persistor}>
          <StatusBar
            backgroundColor={'#FFFFFF'}
            barStyle={'dark-content'}
            hidden
          />
          <MainStack />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
