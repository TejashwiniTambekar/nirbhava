import React, { useState } from "react";

import {
  Text,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Feather from "react-native-vector-icons/Feather";

import logo from "../Assets/Logo/Logo.png";
import InputBox from "../components/InputBox";

import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      Alert.alert("Login Successful 🚀");
      props.navigation.replace("Danger");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#171528", "#201737", "#2b1845"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#171528" />

      <SafeAreaView style={styles.safeArea}>

        {/* LOGO SECTION */}
        <View style={styles.logoBox}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>NIRBHAVA</Text>
          <Text style={styles.subtitle}>
            Stay safe. Stay connected. 🚨
          </Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>

          {/* EMAIL */}
          <View style={styles.inputRow}>
            <Feather name="mail" size={20} color="#ff6ea9" />
            <View style={{ flex: 1 }}>
              <InputBox
                text={email}
                type="email"
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputRow}>
            <Feather name="lock" size={20} color="#ff6ea9" />
            <View style={{ flex: 1 }}>
              <InputBox
                text={password}
                type="password"
                onChangeText={setPassword}
              />
            </View>
          </View>

        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={loginUser}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
          <Feather name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity
          onPress={() => props.navigation.push("ForgotPassword")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.forgot}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* SIGNUP */}
        <View style={styles.bottom}>
          <Text style={{ color: "#fff" }}>
            Don't have an account?
          </Text>

          <Text
            onPress={() => props.navigation.push("SignUp")}
            style={styles.signup}
          >
            Sign Up
          </Text>
        </View>

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
    paddingHorizontal: 18,
    justifyContent: "center",
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
    marginTop: 5,
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
    marginBottom: 12,
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
    fontWeight: "bold",
    fontSize: 16,
  },

  forgot: {
    color: "#cfcfe6",
    textAlign: "center",
    fontSize: 13,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  signup: {
    color: "#ff6ea9",
    fontWeight: "bold",
    marginLeft: 6,
  },
});