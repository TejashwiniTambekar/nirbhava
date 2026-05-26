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
  StatusBar,
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
      if (!user) return;

      const ref = doc(db, 'Users', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        const fixedContacts = (data.emergencyContacts || []).map(
          (item, index) => ({
            id: item.id || index.toString(),
            name: item.name || '',
            phone: item.phone || '',
          })
        );

        setContacts(fixedContacts);
      } else {
        setContacts([]);
      }

    } catch (err) {
      console.log('LOAD ERROR:', err);
    }
  };

  // =========================
  // RELOAD ON FOCUS
  // =========================
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
      Alert.alert('Error', 'Please enter name and phone');
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
  // SAVE CONTACTS
  // =========================
  const saveContacts = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, 'Users', user.uid);

      await updateDoc(ref, {
        emergencyContacts: contacts,
      });

      Alert.alert('Success', 'Contacts Saved Successfully');

      navigation.replace('BarSetting');

    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to save contacts');
    }
  };

  return (
    <LinearGradient
      colors={['#171528', '#201737', '#2b1845']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#171528" />

      <SafeAreaView style={styles.safeArea}>

        {/* =========================
            HEADER WITH BACK BUTTON
        ========================= */}
        <View style={styles.headerRow}>

          {/* BACK BUTTON */}
          <TouchableOpacity
            onPress={() => navigation.replace('BarSetting')}
            style={styles.backBtn}
          >
            <MaterialIcons
              name="arrow-back"
              size={26}
              color="#fff"
            />
          </TouchableOpacity>

          {/* TITLE */}
          <View>
            <Text style={styles.title}>Emergency Contacts</Text>
            <Text style={styles.subtitle}>
              Add trusted contacts for emergency alerts 🚨
            </Text>
          </View>

        </View>

        {/* INPUT BOX */}
        <View style={styles.inputBox}>

          <View style={styles.inputRow}>
            <MaterialIcons name="person" size={20} color="#ff6ea9" />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputRow}>
            <MaterialIcons name="phone" size={20} color="#37c59c" />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={addContact}
          >
            <MaterialIcons name="add" size={22} color="#fff" />
            <Text style={styles.addText}>Add Contact</Text>
          </TouchableOpacity>

        </View>

        {/* CONTACT LIST */}
        <FlatList
          data={contacts}
          keyExtractor={(item, index) =>
            item.id ? item.id : index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => (
            <View style={styles.card}>

              <View style={{ flex: 1 }}>
                <Text style={styles.contactTitle}>
                  Contact {index + 1}
                </Text>

                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.phone}>
                  {item.phone}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => deleteContact(item.id)}
              >
                <MaterialIcons
                  name="delete"
                  size={28}
                  color="#ff4d6d"
                />
              </TouchableOpacity>

            </View>
          )}
        />

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={saveContacts}
        >
          <Text style={styles.saveText}>
            Save Contacts
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1 },

  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  /* NEW HEADER */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backBtn: {
    marginRight: 12,
    padding: 5,
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#cfcfe7',
    marginTop: 4,
    fontSize: 13,
  },

  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },

  input: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 15,
  },

  addBtn: {
    backgroundColor: '#ff6ea9',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 15,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  contactTitle: {
    color: '#ff6ea9',
    fontSize: 13,
    marginBottom: 4,
  },

  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  phone: {
    color: '#ccc',
    marginTop: 4,
    fontSize: 14,
  },

  saveBtn: {
    backgroundColor: '#ff4d6d',
    paddingVertical: 16,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});