import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logo from "../Assets/Logo/Logo1.png"
export default function Playlist() {
  const [selectedPlaylist, setSelectedPlaylist] = React.useState('Playlist 1');

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>

           
<Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>


</View>
<Text style={styles.logoText}>    FAUGET</Text>
      
      {/* Logo */}
      <View style={styles.logoWrapper}>
      <View style={styles.appLogoView}> 
      
      </View>

      {/* Playlist Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>PLAYLIST</Text>
        <View style={styles.playlistRow}>
  <Text style={styles.playlistText}>Playlist 1</Text>
  <TouchableOpacity onPress={() => setSelectedPlaylist('Playlist 1')}>
    <View style={styles.radioOuter}>
      {selectedPlaylist === 'Playlist 1' && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
</View>

<View style={styles.playlistRow}>
  <Text style={styles.playlistText}>Playlist 2</Text>
  <TouchableOpacity onPress={() => setSelectedPlaylist('Playlist 2')}>
    <View style={styles.radioOuter}>
      {selectedPlaylist === 'Playlist 2' && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
</View>

        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      {/* Most Popular */}
      <Text style={styles.sectionTitle}>MOST POPULAR</Text>
      <View style={styles.popularRow}>
        <View style={styles.userCard}>
          <FontAwesome name="user-circle" size={28} color="#2ecc71" />
          <Text style={styles.userName}>Estelle Darcy</Text>
          <Text style={styles.userDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</Text>
          <Text style={styles.moreText}>More</Text>
        </View>
        <View style={styles.userCard}>
          <FontAwesome name="user-circle" size={28} color="#2ecc71" />
          <Text style={styles.userName}>Drew Feig</Text>
          <Text style={styles.userDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</Text>
          <Text style={styles.moreText}>More</Text>
        </View>
      </View>
</View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      paddingTop: 50,
      alignItems: 'center'
    },
    appLogoView: {
      alignItems: "center",
      marginTop: 10,
     
  },
  appLogoImage: {
      height: 70,
      marginRight:-20,
      borderRadius: 500,
  
  },
 
    logoWrapper: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logoCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#2ecc71',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      marginTop: 8,
      fontWeight: 'bold',
      fontSize: 14,
    },
    card: {
      backgroundColor: '#fff',
      padding: 20,
      width: 250,
      borderRadius: 20,
      elevation: 3,
      marginBottom: 10,
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#84eab3',
      marginBottom: 20,
      width:200
    },
    playlistRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    playlistText: {
      fontSize: 16,
      color: '#555',
    },
    box: {
      width: 20,
      height: 20,
      borderRadius: 4,
    },
    searchBtn: {
      backgroundColor: '#84eab3',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    searchText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#84eab3',
      marginBottom: 15,
    },
    popularRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 20,
    },
    userCard: {
      backgroundColor: '#eee',
      borderRadius: 16,
      padding: 15,
      width: '45%',
      alignItems: 'center',
    },
    userName: {
      color: '#84eab3',
      fontWeight: 'bold',
      marginVertical: 6,
    },
    userDesc: {
      textAlign: 'center',
      fontSize: 12,
      color: '#444',
    },
    moreText: {
      marginTop: 8,
      color: '#555',
      fontWeight: '600',
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#84eab3',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#84eab3',
    },
    

  });
  