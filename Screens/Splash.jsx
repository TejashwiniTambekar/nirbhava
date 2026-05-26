import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import logo from "../Assets/Logo/Logo.png";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';

export default function Splash(props) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {

    // 🎬 animation start
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // 🔐 auth check
    const unsubscribe = onAuthStateChanged(auth, user => {

      setTimeout(() => {

        if (user) {
          props.navigation.replace('Danger');
        } else {
          props.navigation.replace('Login');
        }

      }, 2500);

    });

    return unsubscribe;

  }, []);

  return (
    <LinearGradient
      colors={['#0f0f1a', '#1b1836', '#281b40']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />

      <View style={styles.content}>

        {/* LOGO */}
        <Animated.View
          style={[
            styles.logoBox,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        {/* APP NAME */}
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Nirbhaya Safety
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
          Your Safety • Our Priority
        </Animated.Text>

        {/* LOADING DOTS */}
        <View style={styles.loader}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoBox: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },

  logo: {
    width: 120,
    height: 120,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#b8b8d2',
  },

  loader: {
    flexDirection: 'row',
    marginTop: 30,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6ba6',
    marginHorizontal: 5,
    opacity: 0.6,
  },
});