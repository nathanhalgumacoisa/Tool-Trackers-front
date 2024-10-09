"use client"; 
import React from 'react';
import Dropdown from '../components/dropdown/Dropdown.jsx';
import Header from '../components/header/Header.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      
      <Dropdown title={['Carrinhos']} />
    </div>
  );
}

export default App;