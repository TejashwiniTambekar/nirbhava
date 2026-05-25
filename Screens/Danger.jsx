<<<<<<< HEAD
import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  Vibration,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import logo from '../Assets/Logo/Logo.png';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Geolocation from 'react-native-geolocation-service';

import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../Firebase';

import {
  startSOSRecording,
  stopSOSRecording,
} from '../Utils/audioRecorder';

import {uploadAudio} from '../Utils/uploadAudio';

// SMS PACKAGE
import SendSMS from 'react-native-sms';

export default function Danger(props) {

  // =========================
  // REQUEST PERMISSIONS
  // =========================
  const requestPermissions = async () => {

    if (Platform.OS === 'android') {

      try {

        const granted =
          await PermissionsAndroid.requestMultiple([

            PermissionsAndroid.PERMISSIONS
              .ACCESS_FINE_LOCATION,

            PermissionsAndroid.PERMISSIONS
              .SEND_SMS,

            PermissionsAndroid.PERMISSIONS
              .CALL_PHONE,

            PermissionsAndroid.PERMISSIONS
              .RECORD_AUDIO,
          ]);

        return (

          granted[
            PermissionsAndroid.PERMISSIONS
              .ACCESS_FINE_LOCATION
          ] === PermissionsAndroid.RESULTS.GRANTED &&

          granted[
            PermissionsAndroid.PERMISSIONS
              .SEND_SMS
          ] === PermissionsAndroid.RESULTS.GRANTED &&

          granted[
            PermissionsAndroid.PERMISSIONS
              .CALL_PHONE
          ] === PermissionsAndroid.RESULTS.GRANTED &&

          granted[
            PermissionsAndroid.PERMISSIONS
              .RECORD_AUDIO
          ] === PermissionsAndroid.RESULTS.GRANTED
        );

      } catch (error) {

        console.log(
          'PERMISSION ERROR',
          error,
        );

        return false;
      }
    }

    return true;
  };

  // =========================
  // GET CURRENT LOCATION
  // =========================
  const getCurrentLocation = () => {

    return new Promise(
      (resolve, reject) => {

        Geolocation.getCurrentPosition(

          position => {

            resolve({
              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,
            });

          },

          error => {

            console.log(
              'LOCATION ERROR',
              error,
            );

            reject(error);

          },

          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 10000,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      },
    );
  };

  // =========================
  // FETCH USER CONTACTS
  // =========================
  const getUserData = async uid => {

    try {

      const userRef =
        doc(db, 'Users', uid);

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {

        const userData =
          userSnap.data();

        return (
          userData.emergencyContacts
          || []
        );
      }

      return [];

    } catch (error) {

      console.log(
        'FIREBASE ERROR',
        error,
      );

=======
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform, Alert, Linking  } from "react-native";
import { colorList } from "../Utils/ColorList";
import logo from "../Assets/Logo/Logo.png"
import InputBox from "../components/InputBox";
//import Icon from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../Firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/FontAwesome';
export default function Danger(props) {

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const fetchEmergencyContacts = async (uid) => {
    const userRef = doc(db, 'Users', uid);
    const userSnap = await getDoc(userRef);
    console.log("fetchEmergencyContacts",userSnap.exists())
    if (userSnap.exists()) {
     
      return userSnap.data().emergencyContacts || [];
    }
    return [];
  };


  const getUserData = async (uid) => {
    const userRef = doc(db, "Users", uid);
    const userSnap = await getDoc(userRef);
  
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("User Data:", userData);
      return userData.emergencyContacts;
    } else {
      console.log("No such user document!");
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
      return [];
    }
  };

<<<<<<< HEAD
  // =========================
  // SEND SMS TO MULTIPLE CONTACTS
  // =========================
  const sendSMS = async (
    contacts,
    message,
  ) => {

    try {

      // GET ALL PHONE NUMBERS
      const phoneNumbers = contacts
        .filter(
          item =>
            item.phone &&
            item.phone.trim() !== '',
        )
        .map(item => item.phone);

      if (phoneNumbers.length === 0) {

        Alert.alert(
          'No Contacts Found',
        );

        return;
      }

      // SEND SMS
      SendSMS.send(
        {
          body: message,
          recipients: phoneNumbers,
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },

        (completed, cancelled, error) => {

          if (completed) {

            console.log(
              'SMS SENT SUCCESSFULLY',
            );

            Alert.alert(
              'SOS Sent',
              'Emergency SMS sent to all contacts',
            );
          }

          if (cancelled) {

            console.log(
              'SMS CANCELLED',
            );
          }

          if (error) {

            console.log(
              'SMS ERROR',
              error,
            );

            Alert.alert(
              'SMS Failed',
              error,
            );
          }
        },
      );

    } catch (error) {

      console.log(
        'SEND SMS ERROR',
        error,
      );
    }
  };

  // =========================
  // MAKE CALL
  // =========================
  const makeCall = async phone => {

    try {

      await Linking.openURL(
        `tel:${phone}`,
      );

    } catch (error) {

      console.log(
        'CALL ERROR',
        error,
      );
    }
  };

  // =========================
  // MAIN SOS FUNCTION
  // =========================
  const sendEmergencyMessage =
    async () => {

      try {

        Vibration.vibrate(2000);

        const permissionGranted =
          await requestPermissions();

        if (!permissionGranted) {

          Alert.alert(
            'Permission Denied',
            'Please allow all permissions',
          );

          return;
        }

        const currentUser =
          auth.currentUser;

        if (!currentUser) {

          Alert.alert(
            'User not logged in',
          );

          return;
        }

        Alert.alert(
          'SOS Activated',
          'Recording audio...',
        );

        // START RECORDING
        await startSOSRecording();

        // WAIT 15 SECONDS
        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              15000,
            ),
        );

        // STOP RECORDING
        const audioUri =
          await stopSOSRecording();

        // UPLOAD AUDIO
        const audioUrl =
          await uploadAudio(
            audioUri,
          );

        // GET LOCATION
        const location =
          await getCurrentLocation();

        // GET CONTACTS
        const contacts =
          await getUserData(
            currentUser.uid,
          );

        if (
          !contacts ||
          contacts.length === 0
        ) {

          Alert.alert(
            'No emergency contacts found',
          );

          return;
        }

        // GOOGLE MAP LINK
        const locationLink =
          `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

        // MESSAGE
        const message = `
🚨 EMERGENCY ALERT 🚨

Your friend may be in danger.

📍 Live Location:
${locationLink}

🎤 Audio Recording:
${audioUrl}
        `;

        // SEND SMS TO ALL CONTACTS
        await sendSMS(
          contacts,
          message,
        );

        // CALL FIRST CONTACT
        setTimeout(() => {

          if (
            contacts[0]?.phone
          ) {

            makeCall(
              contacts[0].phone,
            );

          }

        }, 3000);

      } catch (error) {

        console.log(
          'SOS ERROR:',
          error,
        );

        Alert.alert(
          'Emergency Failed',
          error?.message
            || 'Something went wrong',
        );
      }
    };

  return (

    <LinearGradient
      colors={[
        '#151526',
        '#1b1836',
        '#281b40',
      ]}
      style={styles.container}>

      <StatusBar
        backgroundColor="#151526"
        barStyle="light-content"
      />

      <SafeAreaView
        style={styles.safeArea}>

        {/* HEADER */}
        <View style={styles.header}>

          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() =>
              props.navigation.replace(
                'BarSetting',
              )
            }>

            <Icon
              name="bars"
              size={24}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

        {/* TOP CARD */}
        <View style={styles.topCard}>

          <Text style={styles.smallText}>
            WOMEN SAFETY
          </Text>

          <Text style={styles.mainTitle}>
            ARE YOU
            <Text
              style={{
                color: '#ff6ba6',
              }}>
              {' '}SAFE ?
            </Text>
          </Text>

          <Text style={styles.desc}>
            Tap the emergency button to
            instantly share your live
            location and audio evidence.
          </Text>

        </View>

        {/* SOS BUTTON */}
        <View style={styles.centerArea}>

          <View style={styles.outerCircle}>

            <View style={styles.middleCircle}>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sosButton}
                onPress={
                  sendEmergencyMessage
                }>

                <Icon
                  name="exclamation"
                  size={70}
                  color="#fff"
                />

                <Text
                  style={styles.sosText}>
                  SOS
                </Text>

              </TouchableOpacity>

            </View>

          </View>

          <Text style={styles.tapText}>
            TAP TO SEND EMERGENCY ALERT
          </Text>

        </View>

        {/* BOTTOM CARD */}
        <View style={styles.bottomCard}>

          {/* SAFE */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.featureBox}>

            <View style={styles.iconBg}>

              <MaterialIcons
                name="security"
                size={30}
                color="#ff6ba6"
              />

            </View>

            <Text style={styles.featureText}>
              Safe
            </Text>

          </TouchableOpacity>

          {/* AUDIO */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.featureBox}
            onPress={() =>
              props.navigation.push(
                'Audio',
              )
            }>

            <View style={styles.iconBg}>

              <Icon
                name="microphone"
                size={26}
                color="#ff6ba6"
              />

            </View>

            <Text style={styles.featureText}>
              Audio
            </Text>

          </TouchableOpacity>

          {/* LOCATION */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.featureBox}
            onPress={async () => {

              try {

                const location =
                  await getCurrentLocation();

                const mapUrl =
                  `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

                Linking.openURL(
                  mapUrl,
                );

              } catch (error) {

                Alert.alert(
                  'Location Error',
                  'Unable to fetch location',
                );
              }
            }}>

            <View style={styles.iconBg}>

              <MaterialIcons
                name="location-on"
                size={30}
                color="#ff6ba6"
              />

            </View>

            <Text style={styles.featureText}>
              Live GPS
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
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  logo: {
    width: 130,
    height: 50,
  },

  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topCard: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  smallText: {
    color: '#b8b8d2',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
  },

  mainTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  desc: {
    color: '#cfcfe7',
    fontSize: 15,
    marginTop: 15,
    lineHeight: 24,
  },

  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,107,166,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  middleCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,107,166,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sosButton: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#ff4d6d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  sosText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 2,
  },

  tapText: {
    color: '#fff',
    marginTop: 35,
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: '600',
  },

  bottomCard: {
    height: 130,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  featureBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBg: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: 'rgba(255,107,166,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  featureText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
  },

=======
  

const sendSMS = (phone, message) => {
  //const phones = phone.join(',');
 const url = `sms:${phone}?body=${encodeURIComponent(message)}`;
  Linking.openURL(url).catch(() => {
    Alert.alert("Failed to open SMS app");
  });
};
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for emergencies.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS auto handles it if added to plist
  };

 
 const sendEmergencyMessage = async () => {

    const permission = await requestLocationPermission();
    if (!permission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }
    try {
      const location = await getCurrentLocation();
      const uid = auth.currentUser.uid;
      const contacts = await getUserData(uid);
  console.log("contacts",contacts)
      //const phoneNumbers = contacts.map(c => c.phone); // ["9876543210", "9988776655"]

      const locationLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      const message = `Emergency Alert!\nYour friend might be in danger.\nLocation: ${locationLink}`;
  
      contacts.forEach(contact => {
        console.log(`Would send to ${contact.name} (${contact.phone}):\n${message}`);
       sendSMS(contact.phone,message)
         Later: "send this message to backend API to trigger SMS/WhatsApp"
      });
  
   // sendSMS(phoneNumbers, message);
      Alert.alert("Emergency message simulated. Check logs.");
    } catch (error) {
      console.error("Emergency error:", error);
      Alert.alert("Failed to send emergency message", error.message);
    }
  };
 
   // const [email, setEmail] = useState("")
    return (
        <SafeAreaView style={styles.bgWrapper}>

          
                
<View style={styles.appLogoView}>
<View style={styles.logoRow}>

           
<Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
<TouchableOpacity onPress={() => props.navigation.replace("BarSetting")}>
  <Icon name="bars" size={34} color="#fff" style={styles.logoIcon} />
</TouchableOpacity>
</View>
  
 
<View style={styles.logoLine} />

                

            </View>
            <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 240, fontSize: 40, fontWeight: "600", }}>
                     ARE YOU <Text style={{ color: '#cc6ea1' }}>OK</Text> ?
            </Text>
           


          


            <View style={styles.buttonRow}>
  {/* No Button */}
  {/* <TouchableOpacity style={[styles.roundButton, { backgroundColor: '#ff6b6b' }]} onPress={() => console.log("No tapped")}>
    <Text style={styles.buttonText}>No</Text>
    // <Icon name="exclamation-circle" size={50} color="#fff" />
  </TouchableOpacity>

  {/* Yes Button */}
  {/* <TouchableOpacity style={[styles.roundButton, { backgroundColor: '#51cf66' }]} onPress={() => sendEmergencyMessage("Yes tapped")}>
    <Text style={styles.buttonText}>Yes</Text>
  </TouchableOpacity>
</View> */ }
<TouchableOpacity style={[styles.roundButton, { backgroundColor: '#ff6b6b' }]} onPress={() => console.log("No tapped")}>
  {/* <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}> */}
          <Icon name="exclamation-circle" size={50} color="#fff" />
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity></View>
 <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 10, fontSize: 20, fontWeight: "600", }}>
                     emergency button ! <Text style={{ color: '#cc6ea1' }}></Text> 
            </Text>


           {/* <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>props.navigation.replace("AllSetScreen")}>
                    <Text style={styles.subTxt}>Next</Text>
                  
                </TouchableOpacity>*/}

 
  


  
  
               


              
               {/*<View style={styles.logoLine1} />*/}


                <View style={styles.logoRow}>

<View style={styles.iconRow}>
  {/* Question Icon */}
  <TouchableOpacity onPress={() => console.log("Question tapped")}>
    <View style={styles.iconWithText2}>
      <Icon name="questioncircleo" size={40} color="#fff"  style={styles.logoIcon1}  />
      <Text style={styles.iconText1}>Question</Text>
    </View>
  </TouchableOpacity>

  {/* Gamepad Icon */}
  <TouchableOpacity onPress={() => console.log("Game tapped")}>
    <View style={styles.iconWithText2}>
      <Icon name="microphone" size={40} color="#fff" style={styles.logoIcon1}/>
      <Text style={styles.iconText1} onPress={() => props.navigation.push('Audio')}>Audio</Text>
    </View>
  </TouchableOpacity>

  {/* Support Icon */}
  <TouchableOpacity onPress={() => console.log("Support tapped")}>
    <View style={styles.iconWithText2}>
     
<Entypo name="direction" size={40} color="#fff" style={styles.logoIcon1}/>
      <Text style={styles.iconText1}>location</Text>
    </View>
  </TouchableOpacity>
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
        alignItems: "flex-start",
        marginTop: 10,
      
    },
    appLogoImage: {
        height: 50,
        marginRight:0
        
    
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 21,
    },
    textView: {
        padding: 0,
    },
    subBtn: {
        backgroundColor: "#e0afcc", borderRadius: 19, padding: 10, marginTop: 50, width: "70%",flexDirection:"row",justifyContent:'center',alignItems:"center"
    },
    subTxt: {
        color: "#ffffff", textAlign: "center", fontSize: 18, fontWeight: "bold",marginRight:10
    },
    logoLine: {
        height: 2,
        backgroundColor: "white", // or any color you want
        marginTop: 10,
        width: "100%",
       
      },
      logoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      },
      logoIcon: {
        marginLeft: 210,
      },
      
      iconWithText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
      },
      
      iconText: {
        color: 'white',
     
        marginRight: 280,
        height: 100,
        
      },


      iconRow: {
        flexDirection: 'row',
      
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
      },
      
      iconWithText2: {
        alignItems: 'center',
        marginLeft: -30,
        marginTop: 180,

      },
      
      iconText: {
        color: '#fff',
        fontSize: 12,
      
      },
      logoIcon1: {
        marginLeft: 80,
        
     
      },
      iconText1: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 80,
       
      },
      logoLine1: {
        height: 2,
        backgroundColor: "white", // or any color you want
        marginTop: 20,
        width: "100%",
       
      },



    
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingHorizontal: 40,
      },
      
      roundButton: {
        width: 100,
        height: 100,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      },
      
      buttonText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
      },
      
      
        sosButton: {
    backgroundColor: '#f44336',
    padding: 20,
    borderRadius: 80,
    alignItems: 'center',
    width: '45%', // Adjust button width for 2x2 grid
  },
      



      
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
});