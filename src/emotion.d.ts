// src/emotion.d.ts
import '@emotion/react';
import { ThemeType } from './helpers/theme/Theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeType['colors'];
    spacing: ThemeType['spacing'];
    borderRadius: ThemeType['borderRadius'];
    boxShadow: ThemeType['boxShadow'];
    fontSize: ThemeType['fontSize'];
  }
}