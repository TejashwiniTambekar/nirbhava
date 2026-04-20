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
  );
}

const styles = StyleSheet.create({
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
