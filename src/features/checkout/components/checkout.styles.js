import {
  ActivityIndicator,
  Avatar,
  Button,
  Colors,
  TextInput,
} from 'react-native-paper';
import styled from 'styled-components/native';

export const CartIconContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${({ theme, bg }) => bg || theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${({ theme }) => theme.space[3]};
`;

export const PayButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  padding: ${({ theme }) => theme.space[2]};
  margin: 0 ${({ theme }) => theme.space[3]};
`;

export const ClearButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.ui.error,
}))`
  padding: ${({ theme }) => theme.space[2]};
  margin: 0 ${({ theme }) => theme.space[3]};
`;

export const CreditCardInputContainer = styled.View`
  margin: 0 ${({ theme }) => theme.space[1]};
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-64px, -64px);
  z-index: 1;
`;
