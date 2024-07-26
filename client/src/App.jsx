import React from 'react';
import { Navbar, Login } from './components/index.js';
import Name from './components/Name.jsx';
import Signup from './components/Signup.jsx';
const App = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-around">
        <Login />
        <Signup />
      </div>
      <Name />
    </>
  );
};

export default App;
