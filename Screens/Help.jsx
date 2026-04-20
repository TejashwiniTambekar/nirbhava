// Help.js

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';

export default function Help() {
  const openEmail = () => {
    Linking.openURL('mailto:support@nirbhavaapp.com?subject=Need Help&body=Hello, I need help with...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Help & Support</Text>

        <View style={styles.section}>
          <Text style={styles.question}>❓ How do I trigger an SOS?</Text>
          <Text style={styles.answer}>
            Tap the SOS button on the home screen. It will start tracking your location and notify your emergency contacts.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.question}>🔒 Is my location data safe?</Text>
          <Text style={styles.answer}>
            Yes, your location is securely stored and only shared during emergencies with trusted contacts.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.question}>📞 Need more help?</Text>
          <Text style={styles.answer}>Feel free to contact our support team anytime:</Text>
          <TouchableOpacity onPress={openEmail}>
            <Text style={styles.email}>support@nirbhavaapp.com</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>We're here to help you stay safe. 🙌</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0984e3',
  },
  answer: {
    fontSize: 16,
    color: '#2f3542',
    marginTop: 5,
  },
  email: {
    color: '#1e90ff',
    marginTop: 10,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    marginTop: 30,
    color: '#636e72',
    fontSize: 14,
  },
});
