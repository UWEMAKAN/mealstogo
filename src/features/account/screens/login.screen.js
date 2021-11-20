import React, { useState, useContext, useEffect } from 'react';
import { Colors } from 'react-native-paper';

import { AuthenticationContext } from '../../../services';
import { Spacer, Text } from '../../../components';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  LoadingContainer,
  Loading,
  ErrorContainer,
  validateEmail,
} from '../components';

const emailError = new Error('Invalid email');
const passwordError = new Error('Password must be at least 6 characters');

const LoginForm = () => {
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    setValidationError(error);
  }, [error]);

  return (
    <AccountContainer>
      <Spacer position="bottom" size="large">
        <AuthInput
          name="email"
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setValidationError(null);
          }}
          onEndEditing={() =>
            !validateEmail(email)
              ? setValidationError(emailError)
              : setValidationError(null)
          }
        />
      </Spacer>
      <Spacer position="bottom" size="medium">
        <AuthInput
          secureTextEntry
          label="Password"
          autoCapitalize="none"
          textContentType="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setValidationError(null);
          }}
          onEndEditing={() =>
            password.length < 6
              ? setValidationError(passwordError)
              : setValidationError(null)
          }
        />
      </Spacer>
      <Spacer position="bottom" size="medium">
        <ErrorContainer>
          <Text variant="error">
            {validationError && validationError.message}
          </Text>
        </ErrorContainer>
      </Spacer>
      {!isLoading ? (
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => {
            if (!email) setValidationError(emailError);
            else if (password.length < 6) setValidationError(passwordError);
            else !validationError && onLogin(email, password);
          }}
        >
          Login
        </AuthButton>
      ) : (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
    </AccountContainer>
  );
};

export const LoginScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Text variant="title">Meals To Go</Text>
      <LoginForm />
      <Spacer position="top" size="large">
        <AuthButton
          icon="arrow-left"
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
