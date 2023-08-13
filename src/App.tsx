// src/App.tsx
import React from 'react';
import { Route, Routes } from "react-router-dom";
import ColorPalette from './components/color-pallete/ColorPallete';
import Layout from './components/layout/Layout';
import Records from './pages/records/Records';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import Home from './pages/home/Home';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './configs/client/Client';
import NewRecord from './pages/records/NewRecord';
import ViewRecord from './pages/records/ViewRecord';
import EditRecord from './pages/records/EditRecord';

const App: React.FC = () => {



  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/records/:modelName' element={<Records />} />
          <Route path='/records/:modelName/create' element={<NewRecord />} />
          <Route path='/records/:modelName/:id' element={<ViewRecord />} />
          <Route path='/records/:modelName/edit/:id' element={<EditRecord />} />
          <Route path='/pallete' element={<ColorPalette />} />
          <Route path='/products' element={<Products />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </QueryClientProvider>
  )

}


export default App;
