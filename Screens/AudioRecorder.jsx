import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import Icon from 'react-native-vector-icons/FontAwesome';

import SendSMS from 'react-native-sms';

const audioRecorderPlayer =
  new AudioRecorderPlayer();

export default function AudioRecorder() {

  const [isRecording, setIsRecording] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [recordedUri, setRecordedUri] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [audioUrl, setAudioUrl] =
    useState(null);

  useEffect(() => {

    return () => {

      audioRecorderPlayer.stopRecorder();

      audioRecorderPlayer.stopPlayer();

    };

  }, []);

  // =========================
  // PERMISSIONS
  // =========================
  const requestPermissions = async () => {

    if (Platform.OS === 'android') {

      const granted =
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS
            .RECORD_AUDIO,

          PermissionsAndroid.PERMISSIONS
            .SEND_SMS,
        ]);

      return (
        granted[
          PermissionsAndroid.PERMISSIONS
            .RECORD_AUDIO
        ] === 'granted'
      );
    }

    return true;
  };

  // =========================
  // SEND SMS
  // =========================
  const sendSMS = message => {

    SendSMS.send(
      {
        body: message,
        recipients: ['9876543210'], // change number
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission:
          true,
      },
      (completed, cancelled, error) => {

        if (completed) {

          Alert.alert(
            'SMS Sent Successfully',
          );

        } else if (cancelled) {

          Alert.alert(
            'SMS Cancelled',
          );

        } else if (error) {

          Alert.alert(
            'SMS Error',
            error,
          );

        }

      },
    );
  };

  // =========================
  // CLOUDINARY UPLOAD
  // =========================
  const uploadAudio = async uri => {

    try {

      setUploading(true);

      const data = new FormData();

      data.append('file', {
        uri: uri,
        type: 'audio/mp4',
        name: `audio_${Date.now()}.mp4`,
      });

      data.append(
        'upload_preset',
        'audio_upload',
      );

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dlctpxe7p/video/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const result =
        await response.json();

      setUploading(false);

      return result.secure_url;

    } catch (error) {

      setUploading(false);

      console.log(
        'UPLOAD ERROR',
        error,
      );

      return null;

    }
  };

  // =========================
  // START RECORD
  // =========================
  const onStartRecord = async () => {

    try {

      const permission =
        await requestPermissions();

      if (!permission) {

        Alert.alert(
          'Permission Denied',
        );

        return;
      }

      const result =
        await audioRecorderPlayer
          .startRecorder();

      setRecordedUri(result);

      setAudioUrl(null);

      setIsRecording(true);

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // STOP RECORD
  // =========================
  const onStopRecord = async () => {

    try {

      const result =
        await audioRecorderPlayer
          .stopRecorder();

      setRecordedUri(result);

      setIsRecording(false);

      const uploadedUrl =
        await uploadAudio(result);

      if (uploadedUrl) {

        setAudioUrl(uploadedUrl);

        // SEND SMS HERE
        sendSMS(
          `Emergency Audio Recording:\n${uploadedUrl}`,
        );

      } else {

        Alert.alert(
          'Upload Failed',
        );

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={
          isRecording
            ? onStopRecord
            : onStartRecord
        }
        style={[
          styles.button,
          {
            backgroundColor:
              isRecording
                ? 'red'
                : 'green',
          },
        ]}>

        <Icon
          name="microphone"
          size={20}
          color="#fff"
        />

        <Text style={styles.text}>
          {
            isRecording
              ? 'Stop Recording'
              : 'Start Recording'
          }
        </Text>

      </TouchableOpacity>

      {
        uploading && (
          <ActivityIndicator
            size="large"
            color="blue"
          />
        )
      }

      {
        audioUrl && (
          <Text style={styles.url}>
            {audioUrl}
          </Text>
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
  },

  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },

  url: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: 'blue',
  },

});
