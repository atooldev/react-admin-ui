// src/App.tsx
import React from 'react';
import { Route, Routes } from "react-router-dom";
import ColorPalette from './components/color-pallete/ColorPallete';
import Layout from './components/layout/Layout';
import Records from './pages/records/Records';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import Home from './pages/home/Home';

const App: React.FC = () => {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/records' element={<Records />} />
        <Route path='/pallete' element={<ColorPalette />} />
        <Route path='/products' element={<Products />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )

}



export default App;
