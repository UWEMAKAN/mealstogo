import React from 'react';
import LottieView from 'lottie-react-native';

import { Spacer, Text } from '../../../components';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AnimationWrapper,
} from '../components';
import source from '../../../../assets/watermelon.json';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={source}
        />
      </AnimationWrapper>
      <Text variant="title">Meals To Go</Text>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          Login
        </AuthButton>
        <Spacer position="top" size="large">
          <AuthButton
            icon="account-outline"
            mode="contained"
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
