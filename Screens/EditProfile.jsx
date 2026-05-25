<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
<<<<<<< HEAD
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
=======
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { auth, db } from '../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditProfile({ navigation }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, 'Users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setFirstname(data.firstname || '');
        setLastname(data.lastname || '');
        setEmail(data.email || '');
        setMobileno(data.mobileno || '');
        setGender(data.gender || '');
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, 'Users', uid);
      await updateDoc(userRef, {
        firstname,
        lastname,
        email,
        mobileno,
        gender,
      });
      Alert.alert('Success', 'Profile updated');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileno}
        onChangeText={setMobileno}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436',
  },
  input: {
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6c5ce7',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
