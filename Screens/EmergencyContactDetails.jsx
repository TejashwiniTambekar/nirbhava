import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { colorList } from '../Utils/ColorList'
import logo from "../Assets/Logo/Logo.png"
import InputBox from '../components/InputBox'
import Icon from "react-native-vector-icons/Feather"
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { AppContext } from '../Utils/AppContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase'
import { doc, setDoc } from 'firebase/firestore'
export default function EmergencyContactDetails(props) {
    const { user, setUser } = useContext(AppContext);
    const contactObj = {
        name:"",
        phone:""
    }
    const [contactList,setContactLis] = useState([
        {
            name:"",
            phone:""
        }
    ])


    const onContactAdd =()=>{
        const list =[...contactList]
        list.push(contactObj)

        setContactLis(list)


    }
    const onContactRemove =(index)=>{
        const list =[...contactList]
        list.splice(index,1)

        setContactLis(list)


    }

    const onAddDetails =(val,index,name)=>{
        const list =[...contactList]
        if(name =="name"){
            list[index].name = val
        }else if(name == "phone"){
            list[index].phone = val
        }
 

        setContactLis(list)

    }

    const onSignUp = async () => {
        try {
          const data = { ...user };
          data.emergencyContacts = contactList;
      
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.mail,
            data.pwd
          );
      
          const client = userCredential.user;
          console.log("User created:", client.uid);
      
          // ✅ Save additional user data to Firestore
          await setDoc(doc(db, "Users", client.uid), {
            name: data.name,
            email: data.mail,
            phone: data.mno,
            emergencyContacts: data.emergencyContacts,
            createdAt: new Date()
          });
      
          props.navigation.replace("Login")
          console.log("User data saved to Firestore!");
        } catch (error) {
          console.error("Signup error:", error.message);
        }
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colorList.appBgColor }}>
            <View style={{ flex: 1, margin: 15,flexDirection:"column",alignItems:"center" }}>
                <View style={styles.appLogoView}>
                    <Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
                    <Text style={styles.title}>NIRBHAVA</Text>

                </View>

                <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 10, fontSize: 24, fontWeight: "600", }}>
                    WHOM TO <Text style={{ color: '#cc6ea1' }}>CONTACT</Text> WHEN YOU'RE IN DANGER
                </Text>
                <ScrollView style={{width:"85%"}} >
                    {contactList && contactList.map((item,i)=>{
                        console.log("ITEM",item)
                        return(
                            <View style={{flexDirection:"row",alignItems:"center",width:"100%",borderWidth:1,borderColor:"white",marginVertical:10,borderRadius:10}}>
                            < View style={{width:"90%",}} key={i}>
                             <InputBox placeHolder={"Name"} type={"name"} onChangeText={(txt)=>onAddDetails(txt,i,"name")} text={item.name} isLine={false} />
                             <InputBox  type={"phone"} isLine={false} text={item.phone} onChangeText={(txt)=>onAddDetails(txt,i,"phone")}/>
                            
                            </View>
                            {i !== 0 && (
                                <TouchableOpacity style={{width:'10%',marginRight:5}} onPress={()=>onContactRemove(i)} >
                            <MatIcon name={'delete'} size={30} color="red"/>
                            </TouchableOpacity>
                            )}
                            
                   
                            </View>
                        )
                    })}
                     <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>onContactAdd()}>
                    <Text style={styles.subTxt}>Add</Text>
                    <Icon name={'plus-circle'} size={20} color="white" />

                </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>onSignUp()}>
                    <Text style={styles.subTxt}>Next</Text>
                    <Icon name={'arrow-right'} size={20} color="white" />

                </TouchableOpacity>
              
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create(({
    appLogoView: {
        alignItems: "center",
        marginTop: 30,
    },
    appLogoImage: {
        height: 60
    },
    title: {
        color: "white",
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 20,
    },
    subBtn: {
        backgroundColor: "#e0afcc", borderRadius: 19, padding: 10, marginTop: 10, width: "80%",flexDirection:"row",justifyContent:'center',alignItems:"center",alignSelf:"center"
    },
    subTxt: {
        color: "#ffffff", textAlign: "center", fontSize: 18, fontWeight: "bold",marginRight:10
    },
}))
