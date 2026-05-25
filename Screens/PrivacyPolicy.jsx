<<<<<<< HEAD
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default function PrivacyPolicy() {
  return (

    <LinearGradient
      colors={['#171528', '#201737', '#2b1845']}
      style={styles.container}
    >

      <StatusBar
        backgroundColor="#171528"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}
          <Text style={styles.header}>
            Privacy Policy 🔐
          </Text>

          <Text style={styles.sub}>
            Your safety & privacy is our priority
          </Text>

          {/* CARD */}
          <View style={styles.card}>

            <Text style={styles.title}>1. Data Collection</Text>
            <Text style={styles.text}>
              We collect only essential data like name, phone number, emergency contacts,
              and live location during SOS activation.
            </Text>

            <Text style={styles.title}>2. Data Usage</Text>
            <Text style={styles.text}>
              Your data is used only for emergency alerts. We never sell or misuse your data.
            </Text>

            <Text style={styles.title}>3. Location & Audio</Text>
            <Text style={styles.text}>
              Location and audio recording are activated only during SOS events for safety purposes.
            </Text>

            <Text style={styles.title}>4. Security</Text>
            <Text style={styles.text}>
              All data is securely stored using Firebase with encrypted transmission.
            </Text>

            <Text style={styles.title}>5. Contact</Text>
            <Text style={styles.text}>
              For support, contact: support@nirbhavaapp.com
            </Text>

          </View>

          {/* FOOTER */}
          <Text style={styles.footer}>
            Last Updated: May 2026
          </Text>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>
=======
// PrivacyPolicy.js

import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function PrivacyPolicy(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Privacy Policy</Text>

        <Text style={styles.text}>
          We value your privacy. This app collects only the necessary information to ensure your safety
          during emergencies. Your data such as location and contacts is never shared without your consent
          and is securely stored.
        </Text>

        <Text style={styles.subHeader}>1. Data Collection</Text>
        <Text style={styles.text}>
          We collect your name, emergency contacts, and location during SOS activation. Audio and video
          recordings are only activated during emergencies.
        </Text>

        <Text style={styles.subHeader}>2. Data Usage</Text>
        <Text style={styles.text}>
          Your data is used solely to notify your trusted contacts and emergency services during critical
          situations. We do not sell or share your data with third-party advertisers.
        </Text>

        <Text style={styles.subHeader}>3. Data Security</Text>
        <Text style={styles.text}>
          All data is transmitted over secure HTTPS connections and stored using encrypted methods via
          Firebase and secure cloud storage.
        </Text>

        <Text style={styles.subHeader}>4. Contact Us</Text>
        <Text style={styles.text}>
          If you have any concerns, please reach out to our support team at support@nirbhavaapp.com.
        </Text>

        <Text style={styles.footer}>Last Updated: May 2025</Text>
      </ScrollView>
    </SafeAreaView>
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    padding: 20,
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  sub: {
    color: '#cfcfe7',
    marginTop: 5,
    marginBottom: 20,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  title: {
    color: '#ff6ea9',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },

  text: {
    color: '#e5e5f5',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },

  footer: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 25,
    fontSize: 12,
  },

});
=======
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2d3436',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: '#636e72',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
    color: '#2f3542',
  },
  footer: {
    fontSize: 14,
    color: '#b2bec3',
    marginTop: 30,
    textAlign: 'center',
  },
});
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
