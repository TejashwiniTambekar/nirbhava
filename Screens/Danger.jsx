import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  Vibration,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import logo from '../Assets/Logo/Logo.png';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Geolocation from 'react-native-geolocation-service';

import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../Firebase';

import {
  startSOSRecording,
  stopSOSRecording,
} from '../Utils/audioRecorder';

import {uploadAudio} from '../Utils/uploadAudio';

// SMS PACKAGE
import SendSMS from 'react-native-sms';

export default function Danger(props) {

  // =========================
  // REQUEST PERMISSIONS
  // =========================
  const requestPermissions = async () => {

    if (Platform.OS === 'android') {

      try {

        const granted =
          await PermissionsAndroid.requestMultiple([

            PermissionsAndroid.PERMISSIONS
              .ACCESS_FINE_LOCATION,

            PermissionsAndroid.PERMISSIONS
              .SEND_SMS,

            PermissionsAndroid.PERMISSIONS
              .CALL_PHONE,

            PermissionsAndroid.PERMISSIONS
              .RECORD_AUDIO,
          ]);

        return (

          granted[
            PermissionsAndroid.PERMISSIONS
              .ACCESS_FINE_LOCATION
          ] === PermissionsAndroid.RESULTS.GRANTED &&

          granted[
            PermissionsAndroid.PERMISSIONS
              .SEND_SMS
          ] === PermissionsAndroid.RESULTS.GRANTED &&

          granted[
            PermissionsAndroid.PERMISSIONS
              .CALL_PHONE
          ] === PermissionsAndroid.RESULTS.GRANTED &&

          granted[
            PermissionsAndroid.PERMISSIONS
              .RECORD_AUDIO
          ] === PermissionsAndroid.RESULTS.GRANTED
        );

      } catch (error) {

        console.log(
          'PERMISSION ERROR',
          error,
        );

        return false;
      }
    }

    return true;
  };

  // =========================
  // GET CURRENT LOCATION
  // =========================
  const getCurrentLocation = () => {

    return new Promise(
      (resolve, reject) => {

        Geolocation.getCurrentPosition(

          position => {

            resolve({
              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,
            });

          },

          error => {

            console.log(
              'LOCATION ERROR',
              error,
            );

            reject(error);

          },

          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 10000,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      },
    );
  };

  // =========================
  // FETCH USER CONTACTS
  // =========================
  const getUserData = async uid => {

    try {

      const userRef =
        doc(db, 'Users', uid);

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {

        const userData =
          userSnap.data();

        return (
          userData.emergencyContacts
          || []
        );
      }

      return [];

    } catch (error) {

      console.log(
        'FIREBASE ERROR',
        error,
      );

      return [];
    }
  };

  // =========================
  // SEND SMS TO MULTIPLE CONTACTS
  // =========================
  const sendSMS = async (
    contacts,
    message,
  ) => {

    try {

      // GET ALL PHONE NUMBERS
      const phoneNumbers = contacts
        .filter(
          item =>
            item.phone &&
            item.phone.trim() !== '',
        )
        .map(item => item.phone);

      if (phoneNumbers.length === 0) {

        Alert.alert(
          'No Contacts Found',
        );

        return;
      }

      // SEND SMS
      SendSMS.send(
        {
          body: message,
          recipients: phoneNumbers,
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },

        (completed, cancelled, error) => {

          if (completed) {

            console.log(
              'SMS SENT SUCCESSFULLY',
            );

            Alert.alert(
              'SOS Sent',
              'Emergency SMS sent to all contacts',
            );
          }

          if (cancelled) {

            console.log(
              'SMS CANCELLED',
            );
          }

          if (error) {

            console.log(
              'SMS ERROR',
              error,
            );

            Alert.alert(
              'SMS Failed',
              error,
            );
          }
        },
      );

    } catch (error) {

      console.log(
        'SEND SMS ERROR',
        error,
      );
    }
  };

  // =========================
  // MAKE CALL
  // =========================
  const makeCall = async phone => {

    try {

      await Linking.openURL(
        `tel:${phone}`,
      );

    } catch (error) {

      console.log(
        'CALL ERROR',
        error,
      );
    }
  };

  // =========================
  // MAIN SOS FUNCTION
  // =========================
  const sendEmergencyMessage =
    async () => {

      try {

        Vibration.vibrate(2000);

        const permissionGranted =
          await requestPermissions();

        if (!permissionGranted) {

          Alert.alert(
            'Permission Denied',
            'Please allow all permissions',
          );

          return;
        }

        const currentUser =
          auth.currentUser;

        if (!currentUser) {

          Alert.alert(
            'User not logged in',
          );

          return;
        }

        Alert.alert(
          'SOS Activated',
          'Recording audio...',
        );

        // START RECORDING
        await startSOSRecording();

        // WAIT 15 SECONDS
        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              15000,
            ),
        );

        // STOP RECORDING
        const audioUri =
          await stopSOSRecording();

        // UPLOAD AUDIO
        const audioUrl =
          await uploadAudio(
            audioUri,
          );

        // GET LOCATION
        const location =
          await getCurrentLocation();

        // GET CONTACTS
        const contacts =
          await getUserData(
            currentUser.uid,
          );

        if (
          !contacts ||
          contacts.length === 0
        ) {

          Alert.alert(
            'No emergency contacts found',
          );

          return;
        }

        // GOOGLE MAP LINK
        const locationLink =
          `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

        // MESSAGE
        const message = `
🚨 EMERGENCY ALERT 🚨

Your friend may be in danger.

📍 Live Location:
${locationLink}

🎤 Audio Recording:
${audioUrl}
        `;

        // SEND SMS TO ALL CONTACTS
        await sendSMS(
          contacts,
          message,
        );

        // CALL FIRST CONTACT
        setTimeout(() => {

          if (
            contacts[0]?.phone
          ) {

            makeCall(
              contacts[0].phone,
            );

          }

        }, 3000);

      } catch (error) {

        console.log(
          'SOS ERROR:',
          error,
        );

        Alert.alert(
          'Emergency Failed',
          error?.message
            || 'Something went wrong',
        );
      }
    };

  return (

    <LinearGradient
      colors={[
        '#151526',
        '#1b1836',
        '#281b40',
      ]}
      style={styles.container}>

      <StatusBar
        backgroundColor="#151526"
        barStyle="light-content"
      />

      <SafeAreaView
        style={styles.safeArea}>

        {/* HEADER */}
        <View style={styles.header}>

          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() =>
              props.navigation.replace(
                'BarSetting',
              )
            }>

            <Icon
              name="bars"
              size={24}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

        {/* TOP CARD */}
        <View style={styles.topCard}>

          <Text style={styles.smallText}>
            WOMEN SAFETY
          </Text>

          <Text style={styles.mainTitle}>
            ARE YOU
            <Text
              style={{
                color: '#ff6ba6',
              }}>
              {' '}SAFE ?
            </Text>
          </Text>

          <Text style={styles.desc}>
            Tap the emergency button to
            instantly share your live
            location and audio evidence.
          </Text>

        </View>

        {/* SOS BUTTON */}
        <View style={styles.centerArea}>

          <View style={styles.outerCircle}>

            <View style={styles.middleCircle}>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sosButton}
                onPress={
                  sendEmergencyMessage
                }>

                <Icon
                  name="exclamation"
                  size={70}
                  color="#fff"
                />

                <Text
                  style={styles.sosText}>
                  SOS
                </Text>

              </TouchableOpacity>

            </View>

          </View>

          <Text style={styles.tapText}>
            TAP TO SEND EMERGENCY ALERT
          </Text>

        </View>

        {/* BOTTOM CARD */}
        <View style={styles.bottomCard}>

          {/* SAFE */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.featureBox}>

            <View style={styles.iconBg}>

              <MaterialIcons
                name="security"
                size={30}
                color="#ff6ba6"
              />

            </View>

            <Text style={styles.featureText}>
              Safe
            </Text>

          </TouchableOpacity>

          {/* AUDIO */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.featureBox}
            onPress={() =>
              props.navigation.push(
                'Audio',
              )
            }>

            <View style={styles.iconBg}>

              <Icon
                name="microphone"
                size={26}
                color="#ff6ba6"
              />

            </View>

            <Text style={styles.featureText}>
              Audio
            </Text>

          </TouchableOpacity>

          {/* LOCATION */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.featureBox}
            onPress={async () => {

              try {

                const location =
                  await getCurrentLocation();

                const mapUrl =
                  `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

                Linking.openURL(
                  mapUrl,
                );

              } catch (error) {

                Alert.alert(
                  'Location Error',
                  'Unable to fetch location',
                );
              }
            }}>

            <View style={styles.iconBg}>

              <MaterialIcons
                name="location-on"
                size={30}
                color="#ff6ba6"
              />

            </View>

            <Text style={styles.featureText}>
              Live GPS
            </Text>

          </TouchableOpacity>

        </View>

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
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  logo: {
    width: 130,
    height: 50,
  },

  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topCard: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  smallText: {
    color: '#b8b8d2',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
  },

  mainTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  desc: {
    color: '#cfcfe7',
    fontSize: 15,
    marginTop: 15,
    lineHeight: 24,
  },

  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,107,166,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  middleCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,107,166,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sosButton: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#ff4d6d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  sosText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 2,
  },

  tapText: {
    color: '#fff',
    marginTop: 35,
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: '600',
  },

  bottomCard: {
    height: 130,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  featureBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBg: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: 'rgba(255,107,166,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  featureText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
  },

});