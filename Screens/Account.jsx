import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { auth, db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Danger from './Danger';

export default function Account({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const user = auth.currentUser;
      setAuthInfo(user); // Save UID, email, metadata

      const userRef = doc(db, 'Users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch account data');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!userData || !authInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Account</Text>

      <View style={styles.avatarContainer}>
        <Icon name="user-circle" size={80} color="#636e72" />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>yogu </Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>

        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{userData.phone}</Text>

        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>Yogu@123</Text>

        <Text style={styles.label}>User ID (UID):</Text>
        <Text style={styles.value}>{authInfo.uid}</Text>

        <Text style={styles.label}>Last Login:</Text>
        <Text style={styles.value}>{new Date(authInfo.metadata.lastSignInTime).toLocaleString()}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Danger")}>
        <Icon name="sign-out" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.logoutText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    backgroundColor: '#6c5ce7',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    padding: 15,
  },
  label: {
    color: '#636e72',
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    color: '#2f3542',
    fontSize: 16,
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: '#d63031',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
