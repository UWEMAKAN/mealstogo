import React, { useState, useEffect, useRef, useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

import { SafeArea, Text } from '../../../components';
import { PhotosContext } from '../../../services';

const ProfileCamera = styled(Camera)`
  height: 100%;
  width: 100%;
`;

const SnapButton = styled(IconButton).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
  icon: 'camera',
  size: 50,
}))`
  position: absolute;
  bottom: 5px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  align-self: center;
`;

const PermissionDeniedContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { saveProfilePhoto } = useContext(PhotosContext);

  const snap = async () => {
    if (cameraRef) {
      console.log('about to snap');
      const photo = await cameraRef.current.takePictureAsync();
      await saveProfilePhoto(photo.uri);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <SafeArea>
      {hasPermission ? (
        <ProfileCamera
          ref={(camera) => {
            cameraRef.current = camera;
          }}
          type={Camera.Constants.Type.front}
        >
          <SnapButton onPress={() => snap()} />
        </ProfileCamera>
      ) : (
        <PermissionDeniedContainer>
          <Text variant="error">No access to camera. Permission Denied</Text>
        </PermissionDeniedContainer>
      )}
    </SafeArea>
  );
};
