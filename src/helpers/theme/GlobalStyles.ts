// src/globalStyles.ts
import { css } from '@emotion/react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap');
  /* Add your global styles here */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
p, h1, h2, h3, h4, h5, h6 {
margin: 0;
padding: 0;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}



html {
    box-sizing: border-box;
    }
    *, *:before, *:after {
    box-sizing: inherit;
    }
  /* Add more global styles as needed */

  font-family: 'Inter', sans-serif;
`;

export default globalStyles;
