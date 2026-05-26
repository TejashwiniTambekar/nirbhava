// AudioRecorder.js

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
  StatusBar,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import Icon from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function AudioRecorder() {

  const [isRecording, setIsRecording] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [recordedUri, setRecordedUri] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);

  const [recordTime, setRecordTime] = useState('00:00');

  // =========================
  // CLEANUP
  // =========================

  useEffect(() => {

    return () => {

      audioRecorderPlayer.stopRecorder();

      audioRecorderPlayer.stopPlayer();

      audioRecorderPlayer.removeRecordBackListener();

      audioRecorderPlayer.removePlayBackListener();
    };

  }, []);

  // =========================
  // PERMISSIONS
  // =========================

  const requestPermissions = async () => {

    if (Platform.OS === 'android') {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      return (
        granted === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    return true;
  };

  // =========================
  // FORMAT TIMER
  // =========================

  const formatTime = (millis) => {

    const totalSeconds = Math.floor(millis / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
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

      const result = await response.json();

      console.log('UPLOAD RESULT', result);

      setUploading(false);

      return result.secure_url;

    } catch (error) {

      setUploading(false);

      console.log('UPLOAD ERROR', error);

      return null;
    }
  };

  // =========================
  // START RECORD
  // =========================

  const onStartRecord = async () => {

    try {

      const permission = await requestPermissions();

      if (!permission) {

        Alert.alert(
          'Permission Denied',
          'Microphone permission is required',
        );

        return;
      }

      const result =
        await audioRecorderPlayer.startRecorder();

      setRecordedUri(result);

      setAudioUrl(null);

      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener(e => {

        setRecordTime(
          formatTime(e.currentPosition),
        );

      });

    } catch (error) {

      console.log('START RECORD ERROR', error);
    }
  };

  // =========================
  // STOP RECORD
  // =========================

  const onStopRecord = async () => {

    try {

      const result =
        await audioRecorderPlayer.stopRecorder();

      audioRecorderPlayer.removeRecordBackListener();

      setIsRecording(false);

      setRecordedUri(result);

      console.log('RECORDED FILE', result);

      const uploadedUrl =
        await uploadAudio(result);

      if (uploadedUrl) {

        setAudioUrl(uploadedUrl);

        Alert.alert(
          'Success 🚀',
          'Audio uploaded successfully',
        );

      } else {

        Alert.alert(
          'Upload Failed',
        );
      }

    } catch (error) {

      console.log('STOP RECORD ERROR', error);
    }
  };

  // =========================
  // PLAY AUDIO
  // =========================

  const onStartPlay = async () => {

    try {

      if (!recordedUri) return;

      await audioRecorderPlayer.startPlayer(
        recordedUri,
      );

      setIsPlaying(true);

      audioRecorderPlayer.addPlayBackListener(e => {

        if (
          e.currentPosition === e.duration
        ) {

          onStopPlay();
        }
      });

    } catch (error) {

      console.log('PLAY ERROR', error);
    }
  };

  // =========================
  // STOP PLAY
  // =========================

  const onStopPlay = async () => {

    try {

      await audioRecorderPlayer.stopPlayer();

      audioRecorderPlayer.removePlayBackListener();

      setIsPlaying(false);

    } catch (error) {

      console.log('STOP PLAY ERROR', error);
    }
  };

  return (

    <LinearGradient
      colors={[
        '#171528',
        '#201737',
        '#2b1845',
      ]}
      style={styles.container}
    >

      <StatusBar
        backgroundColor="#171528"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}

        <View style={styles.header}>

          <View style={styles.iconCircle}>

            <Icon
              name="microphone"
              size={45}
              color="#fff"
            />

          </View>

          <Text style={styles.title}>
            Audio Recorder
          </Text>

          <Text style={styles.subtitle}>
            Record emergency audio securely 🎤
          </Text>

        </View>

        {/* TIMER */}

        <View style={styles.timerBox}>

          <Text style={styles.timer}>
            {recordTime}
          </Text>

        </View>

        {/* RECORD BUTTON */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            isRecording
              ? onStopRecord
              : onStartRecord
          }
          style={[
            styles.recordBtn,
            {
              backgroundColor:
                isRecording
                  ? '#ff4d6d'
                  : '#ff6ea9',
            },
          ]}
        >

          <Icon
            name={
              isRecording
                ? 'stop'
                : 'microphone'
            }
            size={22}
            color="#fff"
          />

          <Text style={styles.btnText}>

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
              activeOpacity={0.85}
              onPress={
                isPlaying
                  ? onStopPlay
                  : onStartPlay
              }
              style={[
                styles.playBtn,
                {
                  backgroundColor:
                    isPlaying
                      ? '#f39c12'
                      : '#2980b9',
                },
              ]}
            >

              <MaterialIcons
                name={
                  isPlaying
                    ? 'stop-circle'
                    : 'play-circle-fill'
                }
                size={24}
                color="#fff"
              />

              <Text style={styles.btnText}>

                {
                  isPlaying
                    ? 'Stop Playback'
                    : 'Play Recording'
                }

              </Text>

            </TouchableOpacity>
          )
        }

        {/* LOADER */}

        {
          uploading && (

            <View style={styles.loaderBox}>

              <ActivityIndicator
                size="large"
                color="#ff6ea9"
              />

              <Text style={styles.uploadText}>
                Uploading Audio...
              </Text>

            </View>
          )
        }

        {/* URL BOX */}

        {
          audioUrl && (

            <View style={styles.urlBox}>

              <Text style={styles.urlTitle}>
                Uploaded Audio URL
              </Text>

              <Text style={styles.url}>
                {audioUrl}
              </Text>

            </View>
          )
        }

      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  iconCircle: {

    width: 110,

    height: 110,

    borderRadius: 55,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.1)',

    marginBottom: 20,
  },

  title: {

    color: '#fff',

    fontSize: 30,

    fontWeight: 'bold',
  },

  subtitle: {

    color: '#cfcfe7',

    marginTop: 8,

    fontSize: 14,
  },

  timerBox: {

    alignSelf: 'center',

    marginBottom: 35,

    backgroundColor: 'rgba(255,255,255,0.06)',

    paddingHorizontal: 30,

    paddingVertical: 15,

    borderRadius: 18,
  },

  timer: {

    color: '#fff',

    fontSize: 32,

    fontWeight: 'bold',

    letterSpacing: 2,
  },

  recordBtn: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: 18,

    borderRadius: 20,

    marginBottom: 18,

    elevation: 8,
  },

  playBtn: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: 18,

    borderRadius: 20,

    elevation: 8,
  },

  btnText: {

    color: '#fff',

    fontSize: 17,

    fontWeight: 'bold',

    marginLeft: 10,
  },

  loaderBox: {

    marginTop: 35,

    alignItems: 'center',
  },

  uploadText: {

    color: '#fff',

    marginTop: 12,

    fontSize: 15,

    fontWeight: '600',
  },

  urlBox: {

    marginTop: 30,

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderRadius: 20,

    padding: 18,

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.08)',
  },

  urlTitle: {

    color: '#ff6ea9',

    fontSize: 16,

    fontWeight: 'bold',

    marginBottom: 10,
  },

  url: {

    color: '#fff',

    lineHeight: 22,
  },
});