// src/App.tsx
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import ColorPalette from './components/color-pallete/ColorPallete';
import Products from './pages/products/Products';

const App: React.FC = () => {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='/pallete' element={<ColorPalette/>} />
        <Route path='/products' element={<Products/>} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  )

}

export default App;
