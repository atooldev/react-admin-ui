// src/components/ColorPalette.tsx
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../helpers/theme/Theme';

const ColorBox: React.FC<{ color: string }> = ({ color }) => {
  return <ColorBoxStyles color={color}>{color}</ColorBoxStyles>;
};

const ColorPalette: React.FC = () => {
  return (
    <PaletteStyles>
      {Object.entries(colors).map(([groupName, groupColors]) => (
        <ColorGroupStyles key={groupName}>
          <h2>{groupName}</h2>
          <ColorGroupContainerStyles>
            {Object.entries(groupColors).map(([shade, color]) => (
              <ColorBox key={shade} color={color} />
            ))}
          </ColorGroupContainerStyles>
        </ColorGroupStyles>
      ))}
    </PaletteStyles>
  );
};

const PaletteStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorGroupStyles = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ColorGroupContainerStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ColorBoxStyles  = styled.div<{ color: string }>`
    width: 100px;
    height: 100px;
    background-color: ${props => props.color};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
`;

export default ColorPalette;
