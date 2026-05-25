import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { auth, db } from '../Firebase';
import { updateDoc, doc, updateEmail, updatePassword } from 'firebase/firestore';

export default function EditProfile({ navigation }) {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const save = async () => {
    try {
      const user = auth.currentUser;

      await updateDoc(doc(db, 'Users', user.uid), {
        name,
        phone,
      });

      if (email) await updateEmail(user, email);
      if (password) await updatePassword(user, password);

      Alert.alert('Updated Successfully');
      navigation.goBack();

    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Edit Profile</Text>

      <TextInput placeholder="Name" placeholderTextColor="#aaa"
        style={styles.input} onChangeText={setName} />

      <TextInput placeholder="Phone" placeholderTextColor="#aaa"
        style={styles.input} onChangeText={setPhone} />

      <TextInput placeholder="New Email" placeholderTextColor="#aaa"
        style={styles.input} onChangeText={setEmail} />

      <TextInput placeholder="New Password" secureTextEntry
        placeholderTextColor="#aaa"
        style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save Changes</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#171528', padding: 20 },
  title: { color: '#fff', fontSize: 22, marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    color: '#fff',
  },

  btn: {
    backgroundColor: '#ff4d6d',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
});