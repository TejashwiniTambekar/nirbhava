import React, { useEffect, useState } from 'react';
<<<<<<< HEAD

=======
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
<<<<<<< HEAD
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { auth, db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import logo from '../Assets/Logo/Logo.png';

export default function Account({ navigation }) {

  const [userData, setUserData] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);

  // 🔥 FETCH USER DATA (ALWAYS FRESH)
  const fetchUserDetails = async () => {
    try {

      const user = auth.currentUser;

      if (!user) {
        Alert.alert("No user found");
        return;
      }

      setAuthInfo(user);
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178

      const userRef = doc(db, 'Users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
<<<<<<< HEAD
        Alert.alert('User not found in Firestore');
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error loading profile');
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
    }
  };

  useEffect(() => {
    fetchUserDetails();
<<<<<<< HEAD

    // 🔥 Refresh when screen comes back
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserDetails();
    });

    return unsubscribe;
  }, [navigation]);

  if (!userData || !authInfo) {
    return (
      <LinearGradient colors={['#171528', '#201737', '#2b1845']} style={styles.loader}>
        <ActivityIndicator size="large" color="#ff6ea9" />
      </LinearGradient>
=======
  }, []);

  if (!userData || !authInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </SafeAreaView>
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
    );
  }

  return (
<<<<<<< HEAD
    <LinearGradient colors={['#171528', '#201737', '#2b1845']} style={styles.container}>

      <StatusBar backgroundColor="#171528" barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.navigate('Danger')}
            >
              <MaterialIcons name="arrow-back-ios-new" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* PROFILE */}
          <View style={styles.card}>
            <Icon name="user-circle" size={80} color="#ff6ea9" />

            <Text style={styles.name}>
              {userData.name || 'No Name'}
            </Text>

            <Text style={styles.email}>
              {userData.email}
            </Text>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>

          {/* INFO */}
          <View style={styles.infoCard}>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{userData.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData.email}</Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{userData.phone}</Text>

            <Text style={styles.label}>UID</Text>
            <Text style={styles.valueSmall}>{authInfo.uid}</Text>

          </View>

        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD

  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  safeArea: { flex: 1, padding: 20 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: { width: 120, height: 45 },

  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 12,
  },

  card: {
    marginTop: 25,
    alignItems: 'center',
    padding: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  email: {
    color: '#ccc',
    marginTop: 5,
  },

  editBtn: {
    marginTop: 15,
    backgroundColor: '#ff4d6d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  infoCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  label: {
    color: '#ff6ea9',
    marginTop: 10,
    fontWeight: 'bold',
  },

  value: {
    color: '#fff',
    marginBottom: 5,
  },

  valueSmall: {
    color: '#ccc',
    fontSize: 12,
  },
});
=======
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
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
