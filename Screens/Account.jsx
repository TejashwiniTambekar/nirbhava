import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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

      const userRef = doc(db, 'Users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        Alert.alert('User not found in Firestore');
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error loading profile');
    }
  };

  useEffect(() => {
    fetchUserDetails();

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
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({

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