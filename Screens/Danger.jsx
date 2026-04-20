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
      return [];
    }
  };

  

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
      



      
});