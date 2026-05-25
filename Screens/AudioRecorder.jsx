<<<<<<< HEAD
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
=======
// AudioRecorder.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/FontAwesome';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      return Object.values(granted).every(val => val === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true;
  };

  const onStartRecord = async () => {
    const permission = await requestPermissions();
    if (!permission) return Alert.alert("Permission Denied");

    const path = Platform.select({
      ios: 'recorded.m4a',
      android: '/sdcard/recorded.mp4',
    });

    const uri = await audioRecorderPlayer.startRecorder(path);
    setRecordedUri(uri);
    setIsRecording(true);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    setRecordedUri(result);
  };

  const onStartPlay = async () => {
    if (!recordedUri) return;
    await audioRecorderPlayer.startPlayer(recordedUri);
    audioRecorderPlayer.addPlayBackListener(() => {});
    setIsPlaying(true);
  };

  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false);
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD

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

=======
      <Text style={styles.title}>Audio Recorder</Text>

      <TouchableOpacity
        onPress={isRecording ? onStopRecord : onStartRecord}
        style={[styles.button, { backgroundColor: isRecording ? '#e74c3c' : '#27ae60' }]}
      >
        <Icon name="microphone" size={20} color="#fff" />
        <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>

      {recordedUri && (
        <TouchableOpacity
          onPress={isPlaying ? onStopPlay : onStartPlay}
          style={[styles.button, { backgroundColor: isPlaying ? '#f39c12' : '#2980b9' }]}
        >
          <Icon name={isPlaying ? 'stop' : 'play'} size={20} color="#fff" />
          <Text style={styles.text}>{isPlaying ? 'Stop Playback' : 'Play Recording'}</Text>
        </TouchableOpacity>
      )}
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD

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

=======
  container: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
<<<<<<< HEAD
  },

  url: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: 'blue',
  },

});
=======
    fontWeight: '600',
  },
});
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
