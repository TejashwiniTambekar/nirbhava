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