// Danger.js

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { auth, db } from '../Firebase';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

export default function Danger() {

  const [contacts, setContacts] = useState([]);

  // =========================
  // LOAD CONTACTS
  // =========================

  useEffect(() => {

    loadContacts();

  }, []);

  const loadContacts = async () => {

    try {

      const user = auth.currentUser;

      if (!user) return;

      const ref =
        doc(db, 'Users', user.uid);

      const snap =
        await getDoc(ref);

      if (snap.exists()) {

        setContacts(
          snap.data().emergencyContacts || []
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // CALL PERMISSION
  // =========================

  const requestCallPermission =
    async () => {

      if (Platform.OS === 'android') {

        const granted =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS
              .CALL_PHONE
          );

        return (
          granted ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      }

      return true;
    };

  // =========================
  // DIRECT CALL
  // =========================

  const makeCall = async () => {

    try {

      if (contacts.length === 0) {

        Alert.alert(
          'No Emergency Contact Found'
        );

        return;
      }

      const permission =
        await requestCallPermission();

      if (!permission) {

        Alert.alert(
          'Permission Denied'
        );

        return;
      }

      const number =
        contacts[0]?.phone;

      if (!number) {

        Alert.alert(
          'Phone number missing'
        );

        return;
      }

      Linking.openURL(
        `tel:${number}`
      );

    } catch (error) {

      console.log(
        'CALL ERROR',
        error
      );
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

      <Text style={styles.title}>
        EMERGENCY SOS
      </Text>

      <TouchableOpacity
        style={styles.sosButton}
        onPress={makeCall}
      >

        <MaterialIcons
          name="call"
          size={70}
          color="#fff"
        />

        <Text style={styles.sosText}>
          CALL NOW
        </Text>

      </TouchableOpacity>

      {
        contacts.length > 0 && (

          <View style={styles.card}>

            <Text style={styles.contactName}>
              {contacts[0]?.name}
            </Text>

            <Text style={styles.contactPhone}>
              {contacts[0]?.phone}
            </Text>

          </View>
        )
      }

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    padding: 20,
  },

  title: {

    color: '#fff',

    fontSize: 32,

    fontWeight: 'bold',

    marginBottom: 60,
  },

  sosButton: {

    width: 220,

    height: 220,

    borderRadius: 110,

    backgroundColor: '#ff1744',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 10,
  },

  sosText: {

    color: '#fff',

    fontSize: 24,

    fontWeight: 'bold',

    marginTop: 10,
  },

  card: {

    marginTop: 60,

    width: '100%',

    backgroundColor:
      'rgba(255,255,255,0.08)',

    padding: 20,

    borderRadius: 20,

    alignItems: 'center',
  },

  contactName: {

    color: '#fff',

    fontSize: 22,

    fontWeight: 'bold',
  },

  contactPhone: {

    color: '#ccc',

    marginTop: 8,

    fontSize: 16,
  },
});