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
} from 'react-native';

import {colorList} from '../Utils/ColorList';
import logo from '../Assets/Logo/Logo.png';

import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';

import Geolocation from 'react-native-geolocation-service';

import {SendDirectSms} from 'react-native-send-direct-sms';

import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../Firebase';
import {startSOSRecording, stopSOSRecording} from '../Utils/audioRecorder';
import {uploadAudio} from '../Utils/uploadAudio';

export default function Danger(props) {
  // =========================
  // REQUEST PERMISSIONS
  // =========================
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        ]);

        return (
          granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.SEND_SMS'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.CALL_PHONE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (error) {
        console.log('PERMISSION ERROR', error);
        return false;
      }
    }

    return true;
  };

  // =========================
  // GET CURRENT LOCATION
  // =========================
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log('LOCATION ERROR', error);
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 60000,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    });
  };

  // =========================
  // FETCH USER CONTACTS
  // =========================
  const getUserData = async uid => {
    try {
      const userRef = doc(db, 'Users', uid);

      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        console.log('USER DATA', userData);

        return userData.emergencyContacts || [];
      }

      return [];
    } catch (error) {
      console.log('FIREBASE ERROR', error);

      return [];
    }
  };

  // =========================
  // SEND SMS
  // =========================
  const sendSMS1 = async (phone, message) => {
    try {
      const result = await SendDirectSms(phone, message)
        .then(res => console.log('then SMS SENT', res, phone, message))
        .catch(err => console.log('catch SMS ERROR', err));

      console.log('CHIN', result);
    } catch (error) {
      console.log('SMS ERROR', error);
    }
  };
  const sendSMS = async (phone, message) => {
    try {
      const url = `sms:${phone}?body=${encodeURIComponent(message)}`;

      await Linking.openURL(url);
    } catch (error) {
      console.log('SMS ERROR', error);
    }
  };

  // =========================
  // MAKE CALL
  // =========================
  const makeCall = async phone => {
    try {
      await Linking.openURL(`tel:${phone}`);
    } catch (error) {
      console.log('CALL ERROR', error);
    }
  };

  // =========================
  // MAIN SOS FUNCTION
  // =========================
  const sendEmergencyMessage = async () => {
    try {
      // Vibrate phone
      Vibration.vibrate(2000);

      // Request permissions
      const permissionGranted = await requestPermissions();

      if (!permissionGranted) {
        Alert.alert('Permission Denied', 'Please allow all permissions');

        return;
      }

      // Check login
      const currentUser = auth.currentUser;

      if (!currentUser) {
        Alert.alert('User not logged in');

        return;
      }

      console.log('USER UID', currentUser.uid);
      // Alert.alert('SOS Activated', 'Recording evidence...');

      // ======================
      // START RECORDING
      // ======================

      await startSOSRecording();

      // ======================
      // WAIT 15 SECONDS
      // ======================

      await new Promise(resolve => setTimeout(resolve, 15000));

      // ======================
      // STOP RECORDING
      // ======================

      const audioUri = await stopSOSRecording();

      console.log('AUDIO URI', audioUri);

      // ======================
      // UPLOAD AUDIO
      // ======================

      const audioUrl = await uploadAudio(audioUri);

      console.log('AUDIO URL', audioUrl);

      // Get location
      const location = await getCurrentLocation();

      console.log('LOCATION', location);

      // Fetch emergency contacts
      const contacts = await getUserData(currentUser.uid);

      console.log('CONTACTS', contacts);

      if (!contacts || contacts.length === 0) {
        Alert.alert('No emergency contacts found');

        return;
      }

      // Create location link
      const locationLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

      // Emergency message
      const message = `
🚨 EMERGENCY ALERT 🚨

Your friend may be in danger.

Live Location:
${locationLink}
      `;

      // Send SMS to all contacts
      contacts.forEach(contact => {
        if (contact.phone) {
          sendSMS(contact.phone, message);
        }
      });

      // Call first contact
      // setTimeout(() => {
      //   if (contacts[0]?.phone) {
      //     makeCall(contacts[0].phone);
      //   }
      // }, 3000);

      Alert.alert('SOS Activated', 'Emergency SMS and Call initiated');
    } catch (error) {
      console.log('SOS ERROR', error);

      Alert.alert('Emergency Failed', error?.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.bgWrapper}>
      <View style={styles.appLogoView}>
        <View style={styles.logoRow}>
          <Image
            source={logo}
            style={styles.appLogoImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => props.navigation.replace('BarSetting')}>
            <Icon name="bars" size={34} color="#fff" style={styles.logoIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoLine} />
      </View>

      <Text style={styles.mainText}>
        ARE YOU <Text style={{color: '#cc6ea1'}}>OK</Text> ?
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.roundButton, {backgroundColor: '#ff6b6b'}]}
          onPress={sendEmergencyMessage}>
          <Icon name="exclamation-circle" size={50} color="#fff" />

          <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.emergencyText}>emergency button !</Text>

      <View style={styles.logoRow}>
        <View style={styles.iconRow}>
          <TouchableOpacity>
            <View style={styles.iconWithText2}>
              <Icon
                name="question-circle"
                size={40}
                color="#fff"
                style={styles.logoIcon1}
              />

              <Text style={styles.iconText1}>Question</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.iconWithText2}>
              <Icon
                name="microphone"
                size={40}
                color="#fff"
                style={styles.logoIcon1}
              />

              <Text
                style={styles.iconText1}
                onPress={() => props.navigation.push('Audio')}>
                Audio
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.iconWithText2}>
              <Entypo
                name="direction"
                size={40}
                color="#fff"
                style={styles.logoIcon1}
              />

              <Text style={styles.iconText1}>Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgWrapper: {
    flex: 1,
    backgroundColor: colorList.appBgColor,
  },

  appLogoView: {
    alignItems: 'flex-start',
    marginTop: 10,
  },

  appLogoImage: {
    height: 50,
  },

  logoLine: {
    height: 2,
    backgroundColor: 'white',
    marginTop: 10,
    width: '100%',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  logoIcon: {
    marginLeft: 210,
  },

  mainText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 240,
    fontSize: 40,
    fontWeight: '600',
  },

  emergencyText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    paddingHorizontal: 40,
  },

  roundButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },

  iconWithText2: {
    alignItems: 'center',
    marginLeft: -30,
    marginTop: 180,
  },

  logoIcon1: {
    marginLeft: 80,
  },

  iconText1: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 80,
  },
});
