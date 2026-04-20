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
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
