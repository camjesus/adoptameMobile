import React from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {FAB} from 'react-native-paper';

function ImageSelector({
  colorCamara,
  setCambioFoto,
  gColorCamara,
  onImageSelected,
  mascotaItem,
}) {
  const selectPhotoTapped = async () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        privateDirectory: true,
        skipBackup: true,
      },
    };

    try {
      console.log('pidiendo permiso');
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const permissionCamera = await PermissionsAndroid.check(
        'android.permission.CAMERA',
      );
      const permissionWriteStorage = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE',
      );
      const permissionREADStorage = await PermissionsAndroid.check(
        'android.permission.READ_EXTERNAL_STORAGE',
      );
      console.log('sali de perdir permiso');

      if (
        !permissionCamera ||
        !permissionWriteStorage ||
        !permissionREADStorage
      ) {
        console.log('Failed to get the required permissions');

        return {
          error: 'Failed to get the required permissions.',
        };
      }
    } catch (error) {
      console.log('error' + error);

      return {
        error: 'Failed to get the required permissions.',
      };
    }

    console.log('abriendo camara');

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        onImageSelected(response);
        mascotaItem.foto_url = null;
        setCambioFoto(true);
        gColorCamara('#FFFFFF');
      }
    });
  };

  return (
    <FAB
      icon="camera"
      style={styles.fabLeft}
      color={colorCamara}
      onPress={() => selectPhotoTapped()}
      animated="true"
      small
    />
  );
}

const styles = StyleSheet.create({
  fabLeft: {
    bottom: 0,
    backgroundColor: '#9575cd',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
});

export default ImageSelector;
