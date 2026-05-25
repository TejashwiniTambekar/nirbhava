<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Help() {

  const [openIndex, setOpenIndex] = useState(null);

  const faq = [
    {
      q: 'How do I trigger SOS?',
      a: 'Press the SOS button on home screen for 3 seconds. It will send live location + audio alert to your emergency contacts.'
    },
    {
      q: 'Is my location tracked always?',
      a: 'No. Location is only shared during SOS activation.'
    },
    {
      q: 'Can I cancel SOS?',
      a: 'Yes, you can add a cancel button or stop recording before sending.'
    },
    {
      q: 'Does app work without internet?',
      a: 'Location works, but SMS/audio upload requires internet.'
    },
    {
      q: 'Where is my data stored?',
      a: 'All data is securely stored in Firebase with encryption.'
    },
  ];

  return (
    <LinearGradient colors={['#171528', '#201737', '#2b1845']} style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>We are here to keep you safe 💜</Text>

        {/* QUICK ACTIONS */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.row}>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => Linking.openURL('tel:112')}
            >
              <MaterialIcons name="call" size={24} color="#fff" />
              <Text style={styles.actionText}>Emergency Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => Linking.openURL('mailto:support@nirbhavaapp.com')}
            >
              <MaterialIcons name="email" size={24} color="#fff" />
              <Text style={styles.actionText}>Email Support</Text>
            </TouchableOpacity>

          </View>

        </View>

        {/* SAFETY TIPS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Safety Tips</Text>

          <Text style={styles.tip}>• Always keep GPS ON during travel</Text>
          <Text style={styles.tip}>• Save 2–3 emergency contacts</Text>
          <Text style={styles.tip}>• Test SOS button once a week</Text>
          <Text style={styles.tip}>• Keep battery charged above 20%</Text>

        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {faq.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqCard}
            onPress={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >

            <Text style={styles.question}>{item.q}</Text>

            {openIndex === index && (
              <Text style={styles.answer}>{item.a}</Text>
            )}

          </TouchableOpacity>
        ))}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Stay safe. We are always with you ❤️
          </Text>
        </View>

      </ScrollView>

    </LinearGradient>
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  subtitle: {
    color: '#cfcfe7',
    marginTop: 5,
    marginBottom: 20,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
  },

  sectionTitle: {
    color: '#ff6ea9',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionBtn: {
    flex: 1,
    backgroundColor: '#ff4d6d',
    margin: 5,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },

  tip: {
    color: '#ddd',
    marginTop: 5,
    fontSize: 14,
  },

  faqCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },

  question: {
    color: '#fff',
    fontWeight: 'bold',
  },

  answer: {
    color: '#cfcfe7',
    marginTop: 10,
  },

  footer: {
    marginTop: 20,
    alignItems: 'center',
  },

  footerText: {
    color: '#ff6ea9',
    fontWeight: 'bold',
  },

});
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
