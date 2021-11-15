import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
`;
