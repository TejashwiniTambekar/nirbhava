import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colorList } from "../Utils/ColorList";
import logo from "../Assets/Logo/Logo.png"
import InputBox from "../components/InputBox";
import Icon from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from 'react-native-vector-icons/Entypo';
import { signOut } from "firebase/auth";
import Share from 'react-native-share';
//import Icon from 'react-native-vector-icons/FontAwesome';
export default function BarSetting(props) {
 
  const handleLogout = async () => {
  try {
    await signOut(auth);
    props.navigation.replace("Login"); // Navigate to login screen after logout
  } catch (error) {
    console.error("Logout Error:", error);
    Alert.alert("Logout Failed", error.message);
  }
};


const handleInviteFriends = async () => {
  const shareOptions = {
    title: 'Invite Friends',
    message: 'Hey! Check out this safety app I found. It helps during emergencies: https://yourapp.link',
    // url: 'https://yourapp.link', // Optional: use this if you want to share a download link
  };

  try {
    const result = await Share.open(shareOptions);
    console.log('Share Result:', result);
  } catch (error) {
    if (error.message !== 'User did not share') {
      console.error('Sharing error:', error);
    }
  }
};

   // const [email, setEmail] = useState("")
    return (
        <SafeAreaView style={styles.bgWrapper}>

          
                
<View style={styles.appLogoView}>
<View style={styles.logoRow}>

           
<Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
<TouchableOpacity onPress={() => console.log("Menu opened!")}>
  <Icon name="close" size={34} color="#fff" style={styles.logoIcon} onPress={() => props.navigation.replace("Danger")}/>
</TouchableOpacity>
</View>
  <View style={styles.logoLine} />
  
                  
  
              </View>
 

            <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 20, fontSize: 20, fontWeight: "600", }}>
          SETTINGS               <Text style={{ color: '#cc6ea1' }}>        </Text> 
            </Text>
                

           
<TouchableOpacity onPress={() => props.navigation.replace("Account")}>
 

            <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 40, fontSize: 20, fontWeight: "600", }}>
                    <Icon name="key" size={20} color="#fff" style={styles.logoIcon} />  <Text style={{ color: '#cc6ea1' }}> Account                       </Text> 
            </Text>
            </TouchableOpacity>
            <View style={styles.logoLine1} />
  
                  
  <TouchableOpacity onPress={() => props.navigation.push("PrivacyPolicy")}>
  

              
            <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 40, fontSize: 20, fontWeight: "600", }}>
            <Icon name="lock" size={20} color="#fff" style={styles.logoIcon} />  <Text style={{ color: '#cc6ea1' }}> Privacy                       </Text> 
            </Text></TouchableOpacity>
            <View style={styles.logoLine1} />
  
                  
  
              <TouchableOpacity onPress={() => props.navigation.navigate('Help')}>
            <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 40, fontSize: 20, fontWeight: "600", }}>
                     <Icon name="questioncircleo" size={20} color="#fff"  style={styles.logoIcon1}  />  <Text style={{ color: '#cc6ea1' }}> Help                           </Text> 
            </Text></TouchableOpacity>
            <View style={styles.logoLine1} />
  
            
  <TouchableOpacity onPress={handleInviteFriends}>
     <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 40, fontSize: 20, fontWeight: "600", }}>   
                            <Icon name="addusergroup" size={20} color="#fff"  style={styles.logoIcon1} />   <Text style={{ color: '#cc6ea1' }}>
                                       Invite a friend              </Text> 
            </Text>
 
</TouchableOpacity>
 <View style={styles.logoLine1} />
  
            
  <TouchableOpacity onPress={() => props.navigation.push("Audio")}>
     <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 40, fontSize: 20, fontWeight: "600", }}>   
                            <Icon name="microphone" size={20} color="#fff"  style={styles.logoIcon1} />   <Text style={{ color: '#cc6ea1' }}>
                                       Recorder                     </Text> 
            </Text>
 
</TouchableOpacity>

           
           

           


            <View style={styles.logoLine1} />
  
                  
   <TouchableOpacity onPress={handleLogout} >

<Text style={{ color: "#ffffff", textAlign: "center", marginTop: 40, fontSize: 20, fontWeight: "600", }}>   
                        <Icon name="logout" size={20} color="#fff"  style={styles.logoIcon1} />     <Text style={{ color: '#cc6ea1' }} onPress={() => props.navigation.replace("Login")}>Logout          </Text>             </Text>

              
           
           
 
</TouchableOpacity>


          


            


  

  
               


              
               {/*<View style={styles.logoLine1} />*/}



                    
        
     

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
        marginTop: 220,

      },
      
      iconText: {
        color: '#fff',
        fontSize: 12,
      
      },
      logoIcon1: {
        marginLeft: 60,
        
     
      },
      iconText1: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 60,
       
      },
      logoLine1: {
        height: 1,
        backgroundColor: "#ffcccc", // or any color you want
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
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      },
      
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      
      
      
      
});