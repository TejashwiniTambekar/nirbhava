<<<<<<< HEAD
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { auth, db } from '../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function EmergencyContacts({ navigation }) {

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // =========================
  // LOAD CONTACTS
  // =========================
  const loadContacts = async () => {
    try {
      const user = auth.currentUser;
      const ref = doc(db, 'Users', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setContacts(snap.data().emergencyContacts || []);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  // 🔥 FIX: reload every time screen opens
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  // =========================
  // ADD CONTACT
  // =========================
  const addContact = () => {
    if (!name || !phone) {
      Alert.alert('Enter name and phone');
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      name,
      phone,
    };

    setContacts(prev => [...prev, newContact]);
    setName('');
    setPhone('');
  };

  // =========================
  // DELETE CONTACT
  // =========================
  const deleteContact = (id) => {
    const updated = contacts.filter(item => item.id !== id);
    setContacts(updated);
  };

  // =========================
  // SAVE TO FIREBASE
  // =========================
  const saveContacts = async () => {
    try {
      const user = auth.currentUser;
      const ref = doc(db, 'Users', user.uid);

      await updateDoc(ref, {
        emergencyContacts: contacts,
      });

      Alert.alert('Saved Successfully');

      // 🔥 refresh instantly
      await loadContacts();

      navigation.goBack();

    } catch (err) {
      console.log(err);
      Alert.alert('Error saving contacts');
    }
  };

  return (
    <LinearGradient
      colors={['#171528', '#201737', '#2b1845']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Contacts</Text>
        </View>

        {/* INPUT */}
        <View style={styles.inputBox}>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TouchableOpacity style={styles.addBtn} onPress={addContact}>
            <MaterialIcons name="add" size={22} color="#fff" />
            <Text style={styles.addText}>Add Contact</Text>
          </TouchableOpacity>

        </View>

        {/* LIST */}
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>

              <TouchableOpacity onPress={() => deleteContact(item.id)}>
                <MaterialIcons name="delete" size={24} color="#ff4d6d" />
              </TouchableOpacity>

            </View>
          )}
        />

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveContacts}>
          <Text style={styles.saveText}>Save Contacts</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

// =========================
// STYLES (DARK WOW UI)
// =========================
const styles = StyleSheet.create({

  container: { flex: 1 },

  safeArea: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },

  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#ff6ea9',
    padding: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  phone: {
    color: '#ccc',
    marginTop: 4,
  },

  saveBtn: {
    backgroundColor: '#ff4d6d',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
