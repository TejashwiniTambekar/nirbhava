<<<<<<< HEAD
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
=======
import { Text, SafeAreaView, Image, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import logo from "../Assets/Logo/Logo.png"
import { colorList } from "../Utils/ColorList";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { auth, db } from '../Firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default function Login(props) {

 const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [password, setPassword] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

//   const addUser = async () => {
//     try {
//       await addDoc(collection(db, 'Users'), {
//         name: 'John Doe',
//         email: 'john@example.com',
//         createdAt: serverTimestamp(),
//       });
//       Alert.alert("User created successfully");
//     } catch (err) {
//     //   console.log("Create err", err);
//     }
//   };

  const addUser = async () => {
    try {
      await addDoc(collection(db, 'Users'), {
        name: "test",
        mail: "test@gmail.com",
        mno: "9164734516",
        pwd: "123456", // ⚠️ Ideally, don't store plain passwords
        emergencyContacts: [
          {
            name: "Mom",
            phone: "9574835674"
          }
        ],
        createdAt: serverTimestamp(),
      });
      Alert.alert("User created successfully");
    } catch (err) {
      console.error("Create User Error: ", err);
      Alert.alert("Failed to create user", err.message || 'An unknown error occurred');
    }
  };

  const onSubmit = async() => {
    // You can add validation here if needed
    if (!email) {
      setEmailErr("Email is required");
      return;
    }
  
    if (!password) {
      setPasswordErr("Password is required");
      return;
    }
  
    // Clear any previous errors
    setEmailErr("");
    setPasswordErr("");
    await loginUser(email,password)
    // Navigate to the next screen
    // Replace "Home" with your actual screen name
  };
  

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user.uid);
      props.navigation.navigate("Danger");
      Alert.alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login failed", error.message);
    }
  };



  

const loginHandler = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optional: Store login time or other metadata
    await setDoc(doc(db, "loginLogs", user.uid), {
      email: user.email,
      lastLogin: new Date(),
    }, { merge: true }); // `merge: true` updates existing records

    alert("Login successful!");
    props.navigation.replace("HomeScreen"); // or wherever
  } catch (error) {
    alert(error.message);
  }
};



  
  
    return (
        <SafeAreaView style={styles.bgWrapper}>
            <View style={styles.appLogoView} onSubmit={loginHandler}>
                <Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
                <Text style={styles.textStyle}>NIRBHAVAA</Text>
                
            </View>
            <View style={styles.textView}>
                <InputBox  text={email} isError={false} errMsg={emailErr} type="email" onChangeText={(txt) => setEmail(txt)}  />
                <InputBox  text={password} isError={false} errMsg={passwordErr} type="password" onChangeText={(txt) => setPassword(txt)} />
            </View>

            <View style={{ alignItems: "center", flex:4 }}>
                <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>onSubmit()}>
                    <Text style={styles.subTxt}>LOGIN</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ color: "white", marginTop: 10, fontWeight:"bold", fontSize:13 }}>Forgot Password? </Text>
                    <Text style={{ color: "#37c59c", marginTop: 10, fontWeight:"bold", fontSize:13 }} onPress={() => props.navigation.push("ForgotPassword")}> Click Here</Text>
                </View>
            </View>

            <View style={{ justifyContent: "flex-end", marginBottom:15 }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ color: "white",fontWeight:"bold", fontSize:13 }}>Don't have an account yet?</Text>
                    <Text style={{  color: "#37c59c", fontWeight:"bold", fontSize:13, marginLeft:6}} onPress={() => props.navigation.push("SignUp")}>SIGN UP</Text>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bgWrapper: {
        flex: 1,
        backgroundColor: colorList.appBgColor
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
    textView: {
        padding: 50,
        marginTop: 50,
        flex:1
    },
    subBtn: {
        backgroundColor: "#e0afcc", borderRadius: 19, padding: 10, marginTop: 50,width:"70%"
    },
    subTxt: {
        color: "#ffffff", textAlign: "center", fontSize: 18, fontWeight: "bold"
    },
}) 
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
