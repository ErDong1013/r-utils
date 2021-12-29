import React from 'react';

import { Provider } from './reducer/Provider';

import Demo from './components/demo';

function App() {
  return (
    <>
      <Provider>
        <Demo />
      </Provider>
    </>
  );
}

export default App;
