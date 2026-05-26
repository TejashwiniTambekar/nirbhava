import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  SafeAreaView,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Help() {

  const [openIndex, setOpenIndex] = useState(null);

  const faq = [
    {
      q: "How do I trigger SOS?",
      a: "Press and hold the SOS button for 3 seconds. Your live location and emergency alert will be sent to your saved contacts.",
    },
    {
      q: "Is my location tracked all the time?",
      a: "No. Your location is only shared during emergency activation.",
    },
    {
      q: "Can I cancel SOS after activating?",
      a: "Yes. You can stop or cancel the SOS before alerts are fully sent.",
    },
    {
      q: "Does the app work without internet?",
      a: "Basic SMS features may work, but live location and audio upload require internet.",
    },
    {
      q: "Where is my data stored?",
      a: "Your data is securely stored in Firebase with authentication and protection.",
    },
  ];

  // =========================
  // EMAIL SUPPORT
  // =========================
  const openEmail = () => {

    Linking.openURL(
      "mailto:support@nirbhavaapp.com?subject=Need Help&body=Hello Team,"
    );
  };

  // =========================
  // EMERGENCY CALL
  // =========================
  const emergencyCall = () => {

    Linking.openURL("tel:112");
  };

  return (

    <LinearGradient
      colors={[
        "#171528",
        "#201737",
        "#2b1845",
      ]}
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
        backgroundColor="#171528"
      />

      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >

          {/* HEADER */}
          <Text style={styles.title}>
            Help & Support
          </Text>

          <Text style={styles.subtitle}>
            We are here to help and keep you safe 💜
          </Text>

          {/* QUICK ACTIONS */}
          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              Quick Actions
            </Text>

            <View style={styles.row}>

              {/* CALL */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={emergencyCall}
              >

                <MaterialIcons
                  name="call"
                  size={24}
                  color="#fff"
                />

                <Text style={styles.actionText}>
                  Emergency Call
                </Text>

              </TouchableOpacity>

              {/* EMAIL */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={openEmail}
              >

                <MaterialIcons
                  name="email"
                  size={24}
                  color="#fff"
                />

                <Text style={styles.actionText}>
                  Email Support
                </Text>

              </TouchableOpacity>

            </View>

          </View>

          {/* SAFETY TIPS */}
          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              Safety Tips
            </Text>

            <Text style={styles.tip}>
              • Keep GPS enabled during travel
            </Text>

            <Text style={styles.tip}>
              • Save at least 2 emergency contacts
            </Text>

            <Text style={styles.tip}>
              • Test SOS feature regularly
            </Text>

            <Text style={styles.tip}>
              • Keep your phone battery above 20%
            </Text>

            <Text style={styles.tip}>
              • Share travel plans with trusted people
            </Text>

          </View>

          {/* FAQ */}
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions
          </Text>

          {faq.map((item, index) => (

            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              activeOpacity={0.8}
              onPress={() =>
                setOpenIndex(
                  openIndex === index
                    ? null
                    : index
                )
              }
            >

              <View style={styles.faqHeader}>

                <Text style={styles.question}>
                  {item.q}
                </Text>

                <MaterialIcons
                  name={
                    openIndex === index
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={24}
                  color="#fff"
                />

              </View>

              {openIndex === index && (

                <Text style={styles.answer}>
                  {item.a}
                </Text>

              )}

            </TouchableOpacity>

          ))}

          {/* FOOTER */}
          <View style={styles.footer}>

            <Text style={styles.footerText}>
              Stay Safe. We are always with you ❤️
            </Text>

          </View>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // =========================
  // HEADER
  // =========================
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },

  subtitle: {
    color: "#d4d4ea",
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
  },

  // =========================
  // CARD
  // =========================
  card: {
    backgroundColor:
      "rgba(255,255,255,0.05)",
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
  },

  sectionTitle: {
    color: "#ff6ea9",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  // =========================
  // ACTIONS
  // =========================
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "#ff4d6d",
    marginHorizontal: 5,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "600",
  },

  // =========================
  // TIPS
  // =========================
  tip: {
    color: "#ddd",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
  },

  // =========================
  // FAQ
  // =========================
  faqCard: {
    backgroundColor:
      "rgba(255,255,255,0.05)",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.06)",
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    flex: 1,
    paddingRight: 10,
  },

  answer: {
    color: "#d4d4ea",
    marginTop: 12,
    lineHeight: 22,
    fontSize: 14,
  },

  // =========================
  // FOOTER
  // =========================
  footer: {
    marginTop: 20,
    alignItems: "center",
  },

  footerText: {
    color: "#ff6ea9",
    fontWeight: "bold",
    fontSize: 14,
  },

});