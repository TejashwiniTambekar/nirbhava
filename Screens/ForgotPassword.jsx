<<<<<<< HEAD
import React, { useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Feather from "react-native-vector-icons/Feather";

import { auth } from "../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import logo from "../Assets/Logo/Logo.png";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
=======
// ForgotPassword.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { auth } from '../Firebase'; // Make sure this is correctly set up
import { sendPasswordResetEmail } from 'firebase/auth';
import logo from "../Assets/Logo/Logo.png"
export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
<<<<<<< HEAD

      Alert.alert(
        "Success 🚀",
        "Password reset link sent to your email."
      );

      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
=======
      Alert.alert('Success', 'Password reset link sent to your email.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
    }
  };

  return (
<<<<<<< HEAD
    <LinearGradient
      colors={["#171528", "#201737", "#2b1845"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#171528" />

      <SafeAreaView style={styles.safeArea}>

        {/* LOGO */}
        <View style={styles.logoBox}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Don’t worry, we’ll help you reset it 🔐
          </Text>
        </View>

        {/* INPUT CARD */}
        <View style={styles.card}>
          <View style={styles.inputRow}>
            <Feather name="mail" size={20} color="#ff6ea9" />

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* RESET BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
          <Feather name="send" size={18} color="#fff" />
        </TouchableOpacity>

        {/* BACK TO LOGIN */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={16} color="#ff6ea9" />
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>

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
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  // LOGO
  logoBox: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    height: 70,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#cfcfe6",
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },

  // CARD
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    paddingVertical: 10,
  },

  // BUTTON
  button: {
    marginTop: 25,
    backgroundColor: "#ff6ea9",
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // BACK BUTTON
  backButton: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  backText: {
    color: "#ff6ea9",
    fontSize: 14,
    fontWeight: "600",
  },
});
=======
    <SafeAreaView style={styles.container}>
          {/* <View style={styles.appLogoView} >
                        <Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
                       
                        </View> */}
                   
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241616',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color:'#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e0afcc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
   appLogoView: {
        alignItems: "center",
        marginTop: 30,
    },
    appLogoImage:{
        height:60
    },
      textStyle:{
        color:"white",
        fontWeight:"bold",
        marginTop:10,
        fontSize:21,
    },
});
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
