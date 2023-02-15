import React from 'react'
import RootNavigation from './navigation/';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RootNavigation />
    </BrowserRouter>
    </> 
  )
}

export default App