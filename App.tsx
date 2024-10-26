import React, { useEffect, useState } from 'react';
import { Map } from './src/screens/mapView';
import { RequestPermission } from './src/components/Permission';
import { Provider } from 'react-redux';
import store from './src/networking/redux/store';

function App(): React.JSX.Element {

  useEffect(()=>{
    RequestPermission()
  },[])

  return (
    <Provider store={store}>
      <Map/>
    </Provider>
  );
}

export default App;
