import React from 'react';
import styled, { useTheme } from 'styled-components/native';

const positionVariant = {
  top: 'margin-top',
  bottom: 'margin-bottom',
  left: 'margin-left',
  right: 'margin-right',
};

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 4,
  xxlarge: 5,
};

const getVariant = (position, size, theme) => {
  const property = positionVariant[position];
  const sizeIndex = sizeVariant[size];
  const value = theme.space[sizeIndex];
  return `${property}: ${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

export const Spacer = ({ position = 'left', size = 'small', children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};
