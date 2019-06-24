import React from 'react';
import {Provider} from 'react-redux';
import store from './store';

import EntranceController from './components/EntranceController'

const App = () => {
  return (
    <Provider store={store}>
      <EntranceController/>
    </Provider>
  );
};

export default App;
