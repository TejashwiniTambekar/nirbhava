import React from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import logo from "../Assets/Logo/Logo.png";

import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

import Share from "react-native-share";

export default function BarSetting(props) {

  // LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
      props.navigation.replace("Login");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  // SHARE APP
  const handleInviteFriends = async () => {
    try {
      await Share.open({
        title: "Invite Friends",
        message:
          "Check out this safety app 🚨 It helps during emergencies and sends live alerts!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // MENU ITEM
  const MenuItem = ({ icon, iconType, title, onPress }) => {

    const renderIcon = () => {

      if (iconType === "material") {
        return (
          <MaterialIcons
            name={icon}
            size={22}
            color="#ff6ea9"
          />
        );
      }

      if (iconType === "fa5") {
        return (
          <FontAwesome5
            name={icon}
            size={18}
            color="#ff6ea9"
          />
        );
      }

      return (
        <Icon
          name={icon}
          size={20}
          color="#ff6ea9"
        />
      );
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menuCard}
        onPress={onPress}
      >

        <View style={styles.left}>

          <View style={styles.iconBox}>
            {renderIcon()}
          </View>

          <Text style={styles.text}>
            {title}
          </Text>

        </View>

        <Icon
          name="right"
          size={16}
          color="#fff"
        />

      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#171528", "#201737", "#2b1845"]}
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
        backgroundColor="#171528"
      />

      <SafeAreaView style={styles.safeArea}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>

            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.close}
              onPress={() =>
                props.navigation.replace("Danger")
              }
            >
              <Icon
                name="close"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

          {/* TITLE CARD */}
          <View style={styles.card}>

            <Text style={styles.small}>
              SETTINGS
            </Text>

            <Text style={styles.big}>
              Manage Your{" "}
              <Text style={{ color: "#ff6ea9" }}>
                Safety
              </Text>
            </Text>

            <Text style={styles.desc}>
              Control your account, privacy,
              emergency contacts and app features.
            </Text>

          </View>

          {/* MENU */}
          <View style={styles.menu}>

            <MenuItem
              title="Account"
              icon="user"
              onPress={() =>
                props.navigation.replace("Account")
              }
            />

            <MenuItem
              title="Emergency Contacts"
              icon="phone"
              iconType="material"
              onPress={() =>
                props.navigation.replace(
                  "Details"
                )
              }
            />

            <MenuItem
              title="Privacy Policy"
              icon="lock"
              onPress={() =>
                props.navigation.push("PrivacyPolicy")
              }
            />

            <MenuItem
              title="Help & Support"
              icon="questioncircleo"
              onPress={() =>
                props.navigation.navigate("Help")
              }
            />

            <MenuItem
              title="Invite Friends"
              icon="addusergroup"
              onPress={handleInviteFriends}
            />

         

            <MenuItem
              title="Logout"
              icon="logout"
              onPress={handleLogout}
            />

          </View>

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
    paddingHorizontal: 18,
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  logo: {
    width: 110,
    height: 40,
    resizeMode: "contain",
  },

  close: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },

  // CARD
  card: {
    marginTop: 20,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  small: {
    color: "#c8c8e2",
    fontSize: 12,
    letterSpacing: 2,
  },

  big: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
  },

  desc: {
    color: "#d4d4ea",
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
  },

  // MENU
  menu: {
    marginTop: 20,
    marginBottom: 30,
  },

  menuCard: {
    height: 65,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,110,169,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 12,
    fontWeight: "600",
  },

});