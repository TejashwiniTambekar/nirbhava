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
  );
}

const styles = StyleSheet.create({

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