import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

import React, { useContext, useState } from "react";

import { colorList } from "../Utils/ColorList";

import logo from "../Assets/Logo/Logo.png";

import InputBox from "../components/InputBox";

import Icon from "react-native-vector-icons/Feather";

import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { AppContext } from "../Utils/AppContext";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../Firebase";

import { doc, setDoc } from "firebase/firestore";

export default function EmergencyContactDetails(props) {

  const { user } = useContext(AppContext);

  const contactObj = {
    name: "",
    phone: "",
  };

  const [contactList, setContactLis] = useState([
    {
      name: "",
      phone: "",
    },
  ]);

  // ADD CONTACT
  const onContactAdd = () => {

    const list = [...contactList];

    list.push(contactObj);

    setContactLis(list);
  };

  // REMOVE CONTACT
  const onContactRemove = (index) => {

    const list = [...contactList];

    list.splice(index, 1);

    setContactLis(list);
  };

  // UPDATE INPUTS
  const onAddDetails = (val, index, name) => {

    const list = [...contactList];

    if (name == "name") {
      list[index].name = val;
    } else if (name == "phone") {
      list[index].phone = val;
    }

    setContactLis(list);
  };

  // SIGNUP
  const onSignUp = async () => {

    try {

      const data = { ...user };

      data.emergencyContacts = contactList;

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.mail,
          data.pwd
        );

      const client = userCredential.user;

      await setDoc(doc(db, "Users", client.uid), {
        name: data.name,
        email: data.mail,
        phone: data.mno,
        emergencyContacts: data.emergencyContacts,
        createdAt: new Date(),
      });

      props.navigation.replace("Login");

    } catch (error) {

      console.log(error.message);
    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor={colorList.appBgColor}
        barStyle="light-content"
      />

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.logoContainer}>

          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>
            NIRBHAVA
          </Text>

        </View>

      </View>

      {/* TITLE */}
      <Text style={styles.heading}>
        Emergency{" "}
        <Text style={{ color: "#cc6ea1" }}>
          Contacts
        </Text>
      </Text>

      <Text style={styles.subHeading}>
        Add trusted people who should be contacted during emergencies
      </Text>

      {/* CONTACT LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >

        {
          contactList &&
          contactList.map((item, i) => {

            return (

              <View style={styles.contactCard} key={i}>

                {/* TOP ROW */}
                <View style={styles.cardHeader}>

                  <View style={styles.contactTitleBox}>

                    <FontAwesome
                      name="user-circle"
                      size={22}
                      color="#cc6ea1"
                    />

                    <Text style={styles.contactTitle}>
                      Contact {i + 1}
                    </Text>

                  </View>

                  {
                    i !== 0 && (

                      <TouchableOpacity
                        onPress={() => onContactRemove(i)}
                      >

                        <MatIcon
                          name="delete"
                          size={28}
                          color="#ff5f7e"
                        />

                      </TouchableOpacity>
                    )
                  }

                </View>

                {/* INPUTS */}
                <InputBox
                  placeHolder={"Full Name"}
                  type={"name"}
                  onChangeText={(txt) =>
                    onAddDetails(txt, i, "name")
                  }
                  text={item.name}
                  isLine={false}
                />

               <View style={styles.inputWrapper}>

  <FontAwesome
    name="phone"
    size={18}
    color="#37c59c"
    style={{ marginRight: 10 }}
  />

  <View style={{ flex: 1 }}>
    <InputBox
      placeHolder={"Phone Number"}
      type={"phone"}
      onChangeText={(txt) =>
        onAddDetails(txt, i, "phone")
      }
      text={item.phone}
      isLine={false}
    />
  </View>

</View>
                

              </View>
            );
          })
        }

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={onContactAdd}
        >

          <Icon
            name={"plus-circle"}
            size={22}
            color="white"
          />

          <Text style={styles.addButtonText}>
            Add Contact
          </Text>

        </TouchableOpacity>

      </ScrollView>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={styles.nextButton}
        activeOpacity={0.8}
        onPress={onSignUp}
      >

        <Text style={styles.nextText}>
          Continue
        </Text>

        <Icon
          name={"arrow-right"}
          size={22}
          color="white"
        />

      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // MAIN CONTAINER
  container: {
    flex: 1,
    backgroundColor: "#171528",
    paddingHorizontal: 20,    
  },

  // HEADER
  header: {
    marginTop: 15,
    alignItems: "center",
  },

  // LOGO CONTAINER
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  // LOGO
  logo: {
    width: 55,
    height: 55,
  },

  // APP NAME
  logoText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 10,
    letterSpacing: 1,
  },

  // HEADING
  heading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 30,
  },

  // SUB HEADING
  subHeading: {
    color: "#d0d0d0",
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  // SCROLL
  scrollView: {
    marginTop: 25,
  },

  // CONTACT CARD
  contactCard: {
    backgroundColor: "rgba(255,255,255,0.06)",

    borderRadius: 22,

    padding: 18,

    marginBottom: 20,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.08)",
  },

  // CARD HEADER
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
  },

  // CONTACT TITLE BOX
  contactTitleBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  // CONTACT TITLE
  contactTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },

  // ADD BUTTON
  addButton: {
    backgroundColor: "#cc6ea1",

    borderRadius: 18,

    paddingVertical: 15,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 10,

    elevation: 6,
  },

  // ADD BUTTON TEXT
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },

  // NEXT BUTTON
  nextButton: {
    backgroundColor: "#cc6ea1",

    borderRadius: 20,

    paddingVertical: 17,

    marginBottom: 25,

    marginTop: 10,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    elevation: 8,
  },

  // NEXT TEXT
  nextText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 12,
    letterSpacing: 0.5,
  },
  inputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: 14,
  paddingHorizontal: 12,
  marginTop: 10,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.08)",
},

});