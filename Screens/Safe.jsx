import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function PrivacyPolicy(props) {
  return (
    <LinearGradient
      colors={['#0f0f1a', '#1b1836', '#281b40']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />

      <SafeAreaView style={styles.safeArea}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>

            {/* BACK BUTTON */}
            <TouchableOpacity
  onPress={() => props.navigation.navigate('Danger')}
  style={styles.backBtn}
>
  <MaterialIcons name="arrow-back" size={26} color="#fff" />
</TouchableOpacity>

            {/* TITLE AREA */}
            <View style={styles.headerCenter}>
              <MaterialIcons name="security" size={30} color="#00ff9d" />

              <Text style={styles.title}>Privacy Policy</Text>

              <Text style={styles.subtitle}>
                Your safety & privacy is our priority
              </Text>
            </View>

            {/* RIGHT SPACE */}
            <View style={{width: 40}} />
          </View>

          {/* CARD 1 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🔐 Data Collection</Text>
            <Text style={styles.cardText}>
              We collect only essential information like your name, emergency contacts,
              and real-time location during SOS activation. Audio recordings are
              activated only in emergencies.
            </Text>
          </View>

          {/* CARD 2 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📡 Data Usage</Text>
            <Text style={styles.cardText}>
              Your data is used only to alert your trusted contacts and ensure your safety.
              We do not sell or share your data with advertisers or third parties.
            </Text>
          </View>

          {/* CARD 3 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🛡️ Security</Text>
            <Text style={styles.cardText}>
              All data is encrypted and securely transmitted via HTTPS and Firebase secure storage.
            </Text>
          </View>

          {/* CARD 4 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📞 Contact Support</Text>
            <Text style={styles.cardText}>
              If you have any concerns, contact us at:
            </Text>
            <Text style={styles.email}>support@nirbhavaapp.com</Text>
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
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },

  subtitle: {
    color: '#b8b8d2',
    marginTop: 4,
    fontSize: 13,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00ff9d',
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: '#e6e6f0',
    lineHeight: 22,
  },

  email: {
    marginTop: 8,
    color: '#ff6ba6',
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 20,
    color: '#888',
    fontSize: 12,
  },
});