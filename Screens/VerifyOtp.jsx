// VerifyOtp.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';

export default function VerifyOtp({ route, navigation }) {
  const { confirmation } = route.params;
  const [code, setCode] = useState('');

  const handleVerifyOtp = async () => {
    try {
      await confirmation.confirm(code);
      Alert.alert('Logged in successfully!');
      navigation.replace('Home'); // Navigate to your main screen
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Invalid OTP', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        placeholder="6-digit OTP"
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
