// AudioRecorder.js

import React, {
  useState,
  useEffect,
} from 'react';

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

  // =========================
  // CLEANUP
  // =========================
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
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS
            .RECORD_AUDIO,
        );

      return (
        granted ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    }

    return true;
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
        'https://api.cloudinary.com/v1_1/dxqwgr7fs/video/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const result =
        await response.json();

      console.log(
        'CLOUDINARY RESULT',
        result,
      );

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
          'Microphone permission denied',
        );

        return;
      }

      const result =
        await audioRecorderPlayer
          .startRecorder();

      console.log(
        'RECORDING URI',
        result,
      );

      setRecordedUri(result);

      setAudioUrl(null);

      setIsRecording(true);

    } catch (error) {

      console.log(
        'RECORD START ERROR',
        error,
      );

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

      console.log(
        'RECORDED FILE',
        result,
      );

      const uploadedUrl =
        await uploadAudio(result);

      if (uploadedUrl) {

        setAudioUrl(uploadedUrl);

        Alert.alert(
          'Upload Success',
          uploadedUrl,
        );

      } else {

        Alert.alert(
          'Upload Failed',
        );

      }

    } catch (error) {

      console.log(
        'STOP RECORD ERROR',
        error,
      );

    }
  };

  // =========================
  // PLAY AUDIO
  // =========================
  const onStartPlay = async () => {

    try {

      if (!recordedUri) return;

      await audioRecorderPlayer
        .startPlayer(recordedUri);

      setIsPlaying(true);

    } catch (error) {

      console.log(
        'PLAY ERROR',
        error,
      );

    }
  };

  // =========================
  // STOP PLAY
  // =========================
  const onStopPlay = async () => {

    try {

      await audioRecorderPlayer
        .stopPlayer();

      setIsPlaying(false);

    } catch (error) {

      console.log(
        'STOP PLAY ERROR',
        error,
      );

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Audio Recorder
      </Text>

      {/* RECORD BUTTON */}
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
                ? '#e74c3c'
                : '#27ae60',
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

      {/* PLAY BUTTON */}
      {
        recordedUri && (

          <TouchableOpacity
            onPress={
              isPlaying
                ? onStopPlay
                : onStartPlay
            }
            style={[
              styles.button,
              {
                backgroundColor:
                  isPlaying
                    ? '#f39c12'
                    : '#2980b9',
              },
            ]}>

            <Icon
              name={
                isPlaying
                  ? 'stop'
                  : 'play'
              }
              size={20}
              color="#fff"
            />

            <Text style={styles.text}>
              {
                isPlaying
                  ? 'Stop Playback'
                  : 'Play Recording'
              }
            </Text>

          </TouchableOpacity>
        )
      }

      {/* LOADING */}
      {
        uploading && (
          <View style={styles.loaderContainer}>

            <ActivityIndicator
              size="large"
              color="#2980b9"
            />

            <Text style={styles.uploadText}>
              Uploading Audio...
            </Text>

          </View>
        )
      }

      {/* AUDIO URL */}
      {
        audioUrl && (
          <View style={styles.urlContainer}>

            <Text style={styles.urlTitle}>
              Uploaded Audio URL:
            </Text>

            <Text style={styles.urlText}>
              {audioUrl}
            </Text>

          </View>
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  loaderContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  uploadText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },

  urlContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },

  urlTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  urlText: {
    color: '#2980b9',
  },

});