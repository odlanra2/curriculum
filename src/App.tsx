import React from 'react';
import logo from './logo.svg';
import { AppRouter } from './routers/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
           <AppRouter/>
    </div>
  );
}

export default App;
