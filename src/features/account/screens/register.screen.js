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

export const RegisterScreen = ({ navigation }) => {
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    setValidationError(error);
  }, [error]);

  return (
    <AccountBackground>
      <AccountCover />
      <Text variant="title">Meals To Go</Text>
      <AccountContainer>
        {!isLoading ? (
          <>
            <Spacer position="bottom" size="large">
              <AuthInput
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
                    ? setValidationError(new Error('Invalid email'))
                    : setValidationError(null)
                }
              />
            </Spacer>
            <Spacer position="bottom" size="large">
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
                    ? setValidationError(
                        new Error('Password must be at least 6 characters'),
                      )
                    : setValidationError(null)
                }
              />
            </Spacer>
            <Spacer position="bottom" size="medium">
              <AuthInput
                secureTextEntry
                label="Confirm Password"
                autoCapitalize="none"
                textContentType="password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setValidationError(null);
                }}
                onEndEditing={() =>
                  !password || !confirmPassword || password !== confirmPassword
                    ? setValidationError(new Error('Passwords do not match'))
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
            <AuthButton
              icon="account-outline"
              mode="contained"
              onPress={() =>
                !validationError && onRegister(email, password, confirmPassword)
              }
            >
              Register
            </AuthButton>
          </>
        ) : (
          <LoadingContainer>
            <Loading size={50} animating={true} color={Colors.blue300} />
          </LoadingContainer>
        )}
      </AccountContainer>
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
