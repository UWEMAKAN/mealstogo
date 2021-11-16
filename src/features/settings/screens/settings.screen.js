/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { List, Avatar } from 'react-native-paper';

import { SafeArea, Text, Spacer } from '../../../components';
import { AuthenticationContext } from '../../../services';

const SettingsItem = styled(List.Item)`
  padding: ${({ theme }) => theme.space[3]};
`;

const SettingsIcon = styled(List.Icon).attrs((props) => ({
  ...props,
  color: 'black',
}))``;

const AvatarContainer = styled.View`
  margin-top: ${({ theme }) => theme.space[4]};
  align-items: center;
`;

const AvatarIcon = styled(Avatar.Icon).attrs(({ theme }) => ({
  size: 180,
  backgroundColor: theme.colors.brand.primary,
  icon: 'human',
}))``;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <AvatarContainer>
        <AvatarIcon />
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <SettingsIcon icon="heart-outline" />}
          onPress={() => navigation.navigate('Favourites')}
        ></SettingsItem>
        <SettingsItem
          title="logout"
          left={(props) => <SettingsIcon icon="power" />}
          onPress={onLogout}
        ></SettingsItem>
      </List.Section>
    </SafeArea>
  );
};
