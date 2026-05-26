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

  // FETCH USER DATA
  const fetchUserDetails = async () => {
    try {

      const user = auth.currentUser;

      if (!user) {
        Alert.alert('No user found');
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

  // LOGOUT
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

    // REFRESH WHEN SCREEN FOCUS
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserDetails();
    });

    return unsubscribe;

  }, [navigation]);

  // LOADER
  if (!userData || !authInfo) {
    return (
      <LinearGradient
        colors={['#171528', '#201737', '#2b1845']}
        style={styles.loader}
      >
        <ActivityIndicator size="large" color="#ff6ea9" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#171528', '#201737', '#2b1845']}
      style={styles.container}
    >

      <StatusBar
        backgroundColor="#171528"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>

            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.navigate('BarSetting')}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

          {/* PROFILE CARD */}
          <View style={styles.card}>

            <Icon
              name="user-circle"
              size={85}
              color="#ff6ea9"
            />

            <Text style={styles.name}>
              {userData?.name || 'No Name'}
            </Text>

            <Text style={styles.email}>
              {userData?.email || 'No Email'}
            </Text>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.editText}>
                Edit Profile
              </Text>
            </TouchableOpacity>

          </View>

          {/* USER INFO */}
          <View style={styles.infoCard}>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>
              {userData?.name || 'N/A'}
            </Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              {userData?.email || 'N/A'}
            </Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              {userData?.phone || 'N/A'}
            </Text>

            <Text style={styles.label}>UID</Text>
            <Text style={styles.valueSmall}>
              {authInfo?.uid}
            </Text>

            <Text style={styles.label}>Last Login</Text>
            <Text style={styles.value}>
              {authInfo?.metadata?.lastSignInTime
                ? new Date(
                    authInfo.metadata.lastSignInTime,
                  ).toLocaleString()
                : 'N/A'}
            </Text>

          </View>

          {/* BUTTONS */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Danger')}
          >
            <MaterialIcons
              name="arrow-back"
              size={20}
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon
              name="sign-out"
              size={20}
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Logout
            </Text>
          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  safeArea: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    width: 120,
    height: 45,
  },

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
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },

  email: {
    color: '#ccc',
    marginTop: 5,
    fontSize: 15,
  },

  editBtn: {
    marginTop: 18,
    backgroundColor: '#ff4d6d',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 14,
  },

  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  infoCard: {
    marginTop: 22,
    padding: 20,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  label: {
    color: '#ff6ea9',
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 15,
  },

  value: {
    color: '#fff',
    marginTop: 5,
    fontSize: 16,
  },

  valueSmall: {
    color: '#ccc',
    marginTop: 5,
    fontSize: 12,
  },

  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#6c5ce7',
    padding: 14,
    borderRadius: 15,
  },

  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: '#ff4d6d',
    padding: 14,
    borderRadius: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },

});