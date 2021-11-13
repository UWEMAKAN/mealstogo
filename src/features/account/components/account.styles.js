import styled from 'styled-components/native';
import {
  Button,
  TextInput,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

import source from '../../../../assets/home_bg.jpg';

export const AccountBackground = styled.ImageBackground.attrs({
  source,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  padding: ${({ theme }) => theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  height: ${({ theme }) => theme.sizes[3]};
  width: 256px;
`;

export const AuthForm = styled.View`
  flex: 0.5;
`;

export const LoadingContainer = styled.View``;

export const Loading = styled(ActivityIndicator)``;
