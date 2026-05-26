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

  const [emailErr, setEmailErr] = useState("");

  const [passwordErr, setPasswordErr] = useState("");

  // =========================
  // LOGIN USER
  // =========================
  const loginUser = async () => {

    // VALIDATION
    if (!email.trim()) {

      setEmailErr("Email is required");

    } else {

      setEmailErr("");
    }

    if (!password.trim()) {

      setPasswordErr("Password is required");

    } else {

      setPasswordErr("");
    }

    if (!email.trim() || !password.trim()) {
      return;
    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "Success",
        "Login Successful 🚀"
      );

      props.navigation.replace("Danger");

    } catch (error) {

      console.log("LOGIN ERROR:", error);

      Alert.alert(
        "Login Failed",
        error.message
      );
    }
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

      <SafeAreaView style={styles.safeArea}>

        {/* LOGO */}
        <View style={styles.logoBox}>

          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            NIRBHAVA
          </Text>

          <Text style={styles.subtitle}>
            Stay Safe. Stay Connected 🚨
          </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

          {/* EMAIL */}
          <View style={styles.inputRow}>

           

            <View style={{ flex: 1 }}>

              <InputBox
                text={email}
                type="email"
                errMsg={emailErr}
                isError={emailErr !== ""}
                onChangeText={(txt) => {
                  setEmail(txt);
                  setEmailErr("");
                }}
              />

            </View>

          </View>

          {/* PASSWORD */}
          <View style={styles.inputRow}>


            <View style={{ flex: 1 }}>

              <InputBox
                text={password}
                type="password"
                errMsg={passwordErr}
                isError={passwordErr !== ""}
                onChangeText={(txt) => {
                  setPassword(txt);
                  setPasswordErr("");
                }}
              />

            </View>

          </View>

        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={loginUser}
        >

          <Text style={styles.buttonText}>
            LOGIN
          </Text>

          <Feather
            name="arrow-right"
            size={18}
            color="#fff"
          />

        </TouchableOpacity>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity
          style={styles.forgotBox}
          onPress={() =>
            props.navigation.push(
              "ForgotPassword"
            )
          }
        >

          <Text style={styles.forgot}>
            Forgot Password?
          </Text>

        </TouchableOpacity>

        {/* SIGNUP */}
        <View style={styles.bottom}>

          <Text style={styles.bottomText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              props.navigation.push("SignUp")
            }
          >

            <Text style={styles.signup}>
              Sign Up
            </Text>

          </TouchableOpacity>

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
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  // =========================
  // LOGO
  // =========================
  logoBox: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 100,
    height: 100,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 1,
  },

  subtitle: {
    color: "#d4d4ea",
    fontSize: 14,
    marginTop: 5,
  },

  // =========================
  // CARD
  // =========================
  card: {
    backgroundColor:
      "rgba(255,255,255,0.05)",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },

  // =========================
  // BUTTON
  // =========================
  button: {
    marginTop: 25,
    backgroundColor: "#ff6ea9",
    paddingVertical: 15,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },

  // =========================
  // FORGOT
  // =========================
  forgotBox: {
    marginTop: 18,
    alignItems: "center",
  },

  forgot: {
    color: "#d4d4ea",
    fontSize: 13,
  },

  // =========================
  // BOTTOM
  // =========================
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  bottomText: {
    color: "#fff",
    fontSize: 14,
  },

  signup: {
    color: "#ff6ea9",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },

});