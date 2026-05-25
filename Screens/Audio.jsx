import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Share from 'react-native-share';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function AudioWhatsAppSender({ emergencyPhoneNumber }) {
  const [isRecording, setIsRecording] = useState(false);

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied');
      return;
    }

    try {
      await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
    } catch (error) {
      console.error('Start recorder error:', error);
      Alert.alert('Error starting recording');
    }
  };

  const stopRecordingAndSend = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);

      const filePath = 'file://' + result; // required format
      console.log('Sending file from:', filePath);

      await Share.shareSingle({
        url: filePath,
        type: 'audio/mp4',
        social: Share.Social.WHATSAPP,
        message: 'Emergency audio message!',
      });
    } catch (error) {
      console.error('Stop/send error:', error);
      Alert.alert('Error sending audio');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isRecording ? stopRecordingAndSend : startRecording}
        style={[styles.button, { backgroundColor: isRecording ? '#dc3545' : '#28a745' }]}
      >
        <Text style={styles.text}>
          {isRecording ? 'Stop & Send Audio' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 50 },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
