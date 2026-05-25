<<<<<<< HEAD
import React, { useContext, useState } from "react";

import {
  Text,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";

import logo from "../Assets/Logo/Logo.png";

import { colorList } from "../Utils/ColorList";

import InputBox from "../components/InputBox";

import Icon from "react-native-vector-icons/Feather";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { AppContext } from "../Utils/AppContext";

export default function SignUp(props) {

  const { setUser } = useContext(AppContext);

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  // USERNAME VALIDATION
  const alphbatehandler = (value) => {

    let pattern = /^[a-zA-Z\s]+$/;

    return pattern.test(value);
  };

  // EMAIL VALIDATION
  const emailhandler = (value) => {

    let pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

    return pattern.test(value);
  };

  // PHONE VALIDATION
  const numberhandler = (value) => {

    let pattern = /^(\+91[\-\s]?)?[6789]\d{9}$/;

    return pattern.test(value);
  };

  // PASSWORD VALIDATION
  const passwordhandler = (value) => {

    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    return pattern.test(value);
  };

  // NEXT BUTTON
  const onClickNext = () => {

    if (userName.trim() === "") {
      Alert.alert("Validation Error", "Please enter username");
      return;
    }

    if (!alphbatehandler(userName)) {
      Alert.alert(
        "Validation Error",
        "Username should contain only alphabets"
      );
      return;
    }

    if (email.trim() === "") {
      Alert.alert("Validation Error", "Please enter email");
      return;
    }

    if (!emailhandler(email)) {
      Alert.alert("Validation Error", "Invalid email format");
      return;
    }

    if (phone.trim() === "") {
      Alert.alert("Validation Error", "Please enter phone number");
      return;
    }

    if (!numberhandler(phone)) {
      Alert.alert("Validation Error", "Invalid phone number");
      return;
    }

    if (password.trim() === "") {
      Alert.alert("Validation Error", "Please enter password");
      return;
    }

    if (!passwordhandler(password)) {
      Alert.alert(
        "Validation Error",
        "Password must contain uppercase, lowercase, number & special character"
      );
      return;
    }

    let userDetails = {
      name: userName,
      mail: email,
      mno: phone,
      pwd: password,
    };

    setUser(userDetails);

    props.navigation.replace("Email");
  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor={colorList.appBgColor}
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >

        {/* TOP GLOW */}
        <View style={styles.topGlow} />

        {/* LOGO SECTION */}
        <View style={styles.logoSection}>

          <View style={styles.logoCircle}>

            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />

          </View>

          <Text style={styles.appName}>
            NIRBHAVA
          </Text>

          <Text style={styles.tagline}>
            Your Safety Companion
          </Text>

        </View>

        {/* CARD */}
        <View style={styles.formCard}>

          <Text style={styles.heading}>
            Create Account
          </Text>

          <Text style={styles.subHeading}>
            Register to continue your safe journey
          </Text>

          {/* INPUTS */}
          <View style={{ marginTop: 25 }}>

            <InputBox
              placeHolder={"Username"}
              text={userName}
              type="userName"
              value={userName}
              onChangeText={(txt) => setUserName(txt)}
            />

            <InputBox
              placeHolder={"Email Address"}
              text={email}
              type="email"
              value={email}
              onChangeText={(txt) => setEmail(txt)}
            />

            <InputBox
              placeHolder={"Phone Number"}
              text={phone}
              type="phone"
              value={phone}
              onChangeText={(txt) => setPhone(txt)}
            />

            <InputBox
              placeHolder={"Password"}
              
              text={password}
              type="password"
              value={password}
              onChangeText={(txt) => setPassword(txt)}
            />

          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.8}
            onPress={onClickNext}
          >

            <Text style={styles.nextText}>
              Continue
            </Text>

            <Icon
              name={"arrow-right"}
              size={22}
              color="#fff"
            />

          </TouchableOpacity>

          {/* LOGIN */}
          <View style={styles.bottomRow}>

            <Text style={styles.accountText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Login")
              }
            >

              <Text style={styles.loginText}>
                Sign In
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      
          

        

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // MAIN CONTAINER
  container: {
  flex: 1,
  backgroundColor: "#171528",
},

  // TOP GLOW
  topGlow: {
    position: "absolute",
    top: -120,
    alignSelf: "center",

    width: 320,
    height: 320,

    borderRadius: 200,

    backgroundColor: "rgba(255,255,255,0.05)",
  },

  // LOGO SECTION
  logoSection: {
    alignItems: "center",
    marginTop: 55,
  },

  // LOGO CIRCLE
  logoCircle: {
    width: 110,
    height: 110,

    borderRadius: 60,

    backgroundColor: "rgba(255,255,255,0.08)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  // LOGO
  logo: {
    width: 70,
    height: 70,
  },

  // APP NAME
  appName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 18,
    letterSpacing: 2,
  },

  // TAGLINE
  tagline: {
    color: "#cfcfcf",
    fontSize: 15,
    marginTop: 6,
  },

  // FORM CARD
  formCard: {
    backgroundColor: "rgba(255,255,255,0.05)",

    marginHorizontal: 22,

    marginTop: 35,

    borderRadius: 30,

    padding: 22,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  // HEADING
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },

  // SUB HEADING
  subHeading: {
    color: "#d0d0d0",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 22,
  },

  // NEXT BUTTON
  nextButton: {
    backgroundColor: "#cc6ea1",

    marginTop: 28,

    borderRadius: 18,

    paddingVertical: 17,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    elevation: 8,

    shadowColor: "#cc6ea1",
    shadowOpacity: 0.5,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  // NEXT TEXT
  nextText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 10,
    letterSpacing: 0.5,
  },

  // BOTTOM ROW
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  // ACCOUNT TEXT
  accountText: {
    color: "#cfcfcf",
    fontSize: 14,
  },

  // LOGIN TEXT
  loginText: {
    color: "#37c59c",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },

  // FOOTER ICONS
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    marginTop: 35,
    marginBottom: 35,
  },

  // ICON BOX
  iconBox: {
    alignItems: "center",
  },

  // ICON TEXT
  iconText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },

});
=======
import { Text, SafeAreaView, Image, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import logo from "../Assets/Logo/Logo.png"
import { colorList } from "../Utils/ColorList";
import InputBox from "../components/InputBox";
import { useContext, useEffect,useState } from "react";
import Icon from "react-native-vector-icons/Fontisto"
import { AppContext } from "../Utils/AppContext";
import { createUserWithEmailAndPassword } from "@react-native-firebase/auth";
import { auth } from "../Firebase";

export default function SignUp(props) {
    const [userName, setuserName] = useState("")
    const [userNameErr, setuserNameErr] = useState("")
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
   
    const [phone, setphone] = useState("")
    const [phoneErr, setphoneErr] = useState("")
    const { user, setUser } = useContext(AppContext);


    let alphbatehandler=(elementvalue)=>{
      let pattern = /^[a-zA-Z\s]+$/;
      let result=pattern.test(elementvalue)
      return result
  }
  
  let emailhandler=(elementvalue)=>{
      let pattern =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let result=pattern.test(elementvalue)
      return result
  }
  
  let numberhandler=(elementvalue)=>{
      let pattern=/^(\+91[\-\s]?)?[789]\d{9}$/;
       let result=pattern.test(elementvalue)
      return result
  }
  
  let passwordhandler=(elementvalue)=>{
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      let result=pattern.test(elementvalue)
      return result
  }
  
  let validation1=()=>{
  let textname=document.querySelector('#textFirstName')
  console.log(textname)
  let lastname=document.querySelector('#textLastName')
  
  let emailid=document.querySelector("#textEmaildId")
  let phonenumber=document.querySelector('#number')
  let password=document.querySelector('#textpassword')  
  console.log(password) 
  
  if (textname.value=="") errorhandler1(textname,"enter username!")
      else if(!alphbatehandler(textname.value)) errorhandler1(textname,"enter only alphabets")
      else successHandler1(textname)
  if (lastname.value=="") errorhandler1(lastname,"enter lastname!")
      else if(!alphbatehandler(lastname.value)) errorhandler1(lastname,"enter only alphabets")
      else successHandler1(lastname)
  
  
  
  
  
  if (emailid.value=="") errorhandler1(emailid,"enter emailid!")
      else if(!emailhandler(emailid.value)) errorhandler1(emailid,"incorrect email format")
      else successHandler1(emailid)
  
  if(phonenumber.value=="") errorhandler1(phonenumber,"enter phone number!")
      else if(!numberhandler(phonenumber.value)) errorhandler1(phonenumber,"invalid phone number entry")
      else successHandler1(phonenumber) 
  
  if(password.value=="") errorhandler1(password,"enter password!")
      else if(!passwordhandler(password.value)) errorhandler1(password,"Password must contain atleast 8 characters along with one special character,uppercase,lowercase,number,cannot contain spaces.")
      else successHandler1(password)
  
  }




    let submitHandler = async (e) => {
        e.preventDefault();
        validation1()
        let userDetails = {
            name: userName,
            mail:email,
            mno:phone,
            pwd:password,
            
        }
        setUser(userDetails)

        console.log(userDetails)

        let response = await fetch('http://10.0.2.2:5000/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails)
        })
        let result = await response.json();
        console.log(result)
        alert(result.message)
    }


    const onClickNext =async()=>{

      
        let userDetails = {
            name: userName,
            mail:email,
            mno:phone,
            pwd:password,
            
        }
        setUser(userDetails)
        props.navigation.replace("EmergencyContactDetails")
    }
    




    return (
        <SafeAreaView style={styles.bgWrapper} onSubmit={submitHandler}>
            <View style={styles.appLogoView}>
                <Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
                <Text style={styles.textStyle}>NIRBHAVA</Text>
              
              

            </View>

           

            <View style={styles.textView}>
                <InputBox text={userName} isError={true} errMsg={userNameErr} type="userName" id="textFirstName" value={userName} onChangeText={(txt) => setuserName(txt)} />
                <InputBox text={email} isError={false} errMsg={emailErr} type="email" id="textEmaildId"  value={email} onChangeText={(txt) => setEmail(txt)} />


                <InputBox text={phone} isError={false} errMsg={phoneErr} type="phone" value={phone} id="number" onChangeText={(txt) => setphone(txt)} />
                <InputBox text={password} isError={false} errMsg={passwordErr} type="password"  id=" textpassword"value={password} onChangeText={(txt) => setPassword(txt)} />
            </View>
            <View style={{ alignItems: "center", flex: 1 ,margin:70}}>
                <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} >
                    <Text style={styles.subTxt}>Signup</Text>
                    <Icon name={'arrow-right-l'} size={20} color="white" />

                </TouchableOpacity>

            </View>

            <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>onClickNext()}>
                    <Text style={styles.subTxt}>Next</Text>
                    <Icon name={'arrow-right-l'} size={20} color="white" />

                </TouchableOpacity>

            </View>

            <View style={{ justifyContent: "flex-end", marginBottom: 15 }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Already have an account?</Text>
                    <Text style={{ color: "#37c59c", fontWeight: "bold", fontSize: 13, marginLeft: 6 }} onPress={() => props.navigation.push("Login")}>SIGN IN</Text>
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
        padding: 40,
        marginTop: 10,
        flex: 1
    },
    subBtn: {
        backgroundColor: "#e0afcc", borderRadius: 19, padding: 10, marginTop: 50, width: "70%",flexDirection:"row",justifyContent:'center',alignItems:"center"
    },
    subTxt: {
        color: "#ffffff", textAlign: "center", fontSize: 18, fontWeight: "bold",marginRight:10
    },
})      
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
