import React, { useState, useEffect } from 'react';
import './App.css';
import Playground from './pages/Playground';
import Homepage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </BrowserRouter>
  )
}