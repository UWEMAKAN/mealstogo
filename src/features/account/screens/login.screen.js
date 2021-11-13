import React, { useState, useContext } from 'react';
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
} from '../components';

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <AccountBackground>
      <AccountCover />
      <Text variant="title">MealsToGo</Text>
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
                onChangeText={(text) => setEmail(text)}
              />
            </Spacer>
            <Spacer position="bottom" size="medium">
              <AuthInput
                secureTextEntry
                label="Password"
                autoCapitalize="none"
                textContentType="password"
                secure
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="error">{error && error.message}</Text>
            </Spacer>
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
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
