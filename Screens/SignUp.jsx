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