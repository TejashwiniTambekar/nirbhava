<<<<<<< HEAD
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { colorList } from "../Utils/ColorList";
import logo from "../Assets/Logo/Logo.png";
import Icon from "react-native-vector-icons/Fontisto";

export default function AllSetScreen(props) {
  return (
    <LinearGradient
      colors={["#171528", "#201737", "#2b1845"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#171528" />

      <SafeAreaView style={styles.safeArea}>

        {/* LOGO */}
        <View style={styles.logoBox}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.appName}>NIRBHAVA</Text>
        </View>

        {/* SUCCESS CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={{ color: "#ff6ea9" }}>ALL</Text> SET
          </Text>

          <Text style={styles.subtitle}>
            Your account is ready 🚀{"\n"}
            You are now safe to continue using the app.
          </Text>

          <View style={styles.iconCircle}>
            <Icon name="check" size={40} color="#fff" />
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => props.navigation.replace("Danger")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
          <Icon name="arrow-right-l" size={18} color="#fff" />
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
    alignItems: "center",
    padding: 20,
  },

  // LOGO
  logoBox: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    height: 70,
    width: 120,
  },

  appName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 2,
  },

  // CARD
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#d6d6ef",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    lineHeight: 22,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff6ea9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  // BUTTON
  button: {
    flexDirection: "row",
    backgroundColor: "#ff4d6d",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 18,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
=======
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colorList } from "../Utils/ColorList";
import logo from "../Assets/Logo/Logo.png"
import InputBox from "../components/InputBox";
import Icon from "react-native-vector-icons/Fontisto"

export default function AllSetScreen(props) {
    return (
        <SafeAreaView style={styles.bgWrapper}>

            <View style={styles.appLogoView}>
                <Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
                <Text style={styles.textStyle}>NIRBHAVA</Text>

            </View>
               <Icon name={'arrow-right-l'} size={20} color="white" />
              

              <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 100, fontSize: 30, fontWeight: "600", }}>
                            <Text style={{ color: '#cc6ea1' }}>ALL</Text> 
                             <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>props.navigation.replace("Danger")}>
                                              
                            </TouchableOpacity> SET
                        </Text> 

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
        marginTop: "35%"
    },
    appLogoImage: {
        height: 60
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 21,
    },
    textView: {
        padding: 50,
    },
    subBtn: {
        backgroundColor: "#e0afcc", borderRadius: 19, padding: 10, marginTop: 50, width: "70%",flexDirection:"row",justifyContent:'center',alignItems:"center"
    },
    subTxt: {
        color: "#ffffff", textAlign: "center", fontSize: 18, fontWeight: "bold",marginRight:10
    },
})
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
