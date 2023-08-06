// src/App.tsx
import React from 'react';
import Button from './components/Button';
import Layout from './components/layout/Layout';
import { colors } from './helpers/theme/Theme';
import ColorPalette from './components/color-pallete/ColorPallete';

const App: React.FC = () => {
  return (
    <Layout>
      <Button>Click Me</Button>
I
      
    </Layout>
  );
};

export default App;
