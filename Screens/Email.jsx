import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { colorList } from '../Utils/ColorList';
import logo from '../Assets/Logo/Logo.png';

import InputBox from '../components/InputBox';

import Icon from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppContext } from '../Utils/AppContext';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../Firebase';

import { doc, setDoc } from 'firebase/firestore';

export default function EmergencyContactDetails(props) {
  const { user } = useContext(AppContext);

  const contactObj = {
    name: '',
    phone: '',
  };

  const [contactList, setContactList] = useState([
    {
      name: '',
      phone: '',
    },
  ]);

  const onContactAdd = () => {
    const list = [...contactList];

    list.push({
      name: '',
      phone: '',
    });

    setContactList(list);
  };

  const onContactRemove = index => {
    const list = [...contactList];

    list.splice(index, 1);

    setContactList(list);
  };

  const onAddDetails = (val, index, name) => {
    const list = [...contactList];

    if (name === 'name') {
      list[index].name = val;
    } else if (name === 'phone') {
      list[index].phone = val;
    }

    setContactList(list);
  };

  const onSignUp = async () => {
    try {
      const data = { ...user };

      data.emergencyContacts = contactList;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.mail,
        data.pwd,
      );

      const client = userCredential.user;

      await setDoc(doc(db, 'Users', client.uid), {
        name: data.name,
        email: data.mail,
        phone: data.mno,
        emergencyContacts: data.emergencyContacts,
        createdAt: new Date(),
      });

      console.log('User data saved to Firestore!');

      props.navigation.replace('Danger');
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#120F25"
        barStyle="light-content"
      />

      <LinearGradient
        colors={['#120F25', '#1D163A', '#2A1748', '#381D5B']}
        style={styles.gradient}>
        
        {/* Glow circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}>
          
          {/* Logo */}
          <View style={styles.appLogoView}>
            <View style={styles.logoWrapper}>
              <Image
                source={logo}
                style={styles.appLogoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>NIRBHAVA</Text>

            <Text style={styles.subTitle}>
              Your safety companion
            </Text>
          </View>

          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Emergency{" "}
              <Text style={{ color: '#ff7eb3' }}>
                Contact Details
              </Text>
            </Text>

            <Text style={styles.desc}>
              Add trusted people who should be contacted instantly during emergencies.
            </Text>
          </View>

          {/* Contact Cards */}
          {contactList.map((item, i) => {
            return (
              <View style={styles.card} key={i}>
                
                {/* Top Row */}
                <View style={styles.cardTop}>
                  <View style={styles.contactBadge}>
                    <MatIcon
                      name="account-heart"
                      size={20}
                      color="#fff"
                    />
                  </View>

                  <Text style={styles.contactTitle}>
                    Contact {i + 1}
                  </Text>

                  {i !== 0 && (
                    <TouchableOpacity
                      onPress={() => onContactRemove(i)}
                      style={styles.deleteBtn}>
                      <MatIcon
                        name="delete-outline"
                        size={24}
                        color="#ff5e78"
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Inputs */}
                <View style={{ marginTop: 10 }}>
                  <InputBox
                    placeHolder={'Enter Name'}
                    type={'name'}
                    onChangeText={txt =>
                      onAddDetails(txt, i, 'name')
                    }
                    text={item.name}
                    isLine={false}
                  />

                  <InputBox
                    placeHolder={'Enter Phone Number'}
                    type={'phone'}
                    isLine={false}
                    text={item.phone}
                    onChangeText={txt =>
                      onAddDetails(txt, i, 'phone')
                    }
                  />
                </View>
              </View>
            );
          })}

          {/* Add Button */}
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={onContactAdd}>
            
            <LinearGradient
              colors={['#ff7eb3', '#ff4d8d']}
              style={styles.btnGradient}>
              
              <Icon
                name={'plus-circle'}
                size={20}
                color="white"
              />

              <Text style={styles.btnText}>
                Add Another Contact
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.8}
            onPress={onSignUp}>
            
            <LinearGradient
              colors={['#8E2DE2', '#C471ED']}
              style={styles.nextGradient}>
              
              <Text style={styles.nextText}>
                Continue
              </Text>

              <Icon
                name={'arrow-right'}
                size={22}
                color="white"
              />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120F25',
  },

  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },

  circle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -40,
    right: -40,
  },

  circle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: 'rgba(255,126,179,0.08)',
    bottom: 80,
    left: -40,
  },

  appLogoView: {
    alignItems: 'center',
    marginTop: 30,
  },

  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  appLogoImage: {
    width: 60,
    height: 60,
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 14,
    fontSize: 28,
    letterSpacing: 2,
  },

  subTitle: {
    color: '#b8b8d2',
    marginTop: 5,
    fontSize: 14,
  },

  headingContainer: {
    marginTop: 35,
    marginBottom: 10,
  },

  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  desc: {
    color: '#b8b8d2',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    fontSize: 15,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ff4d8d',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
    flex: 1,
  },

  deleteBtn: {
    padding: 6,
  },

  addBtn: {
    marginTop: 30,
  },

  btnGradient: {
    paddingVertical: 16,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

  nextBtn: {
    marginTop: 18,
    marginBottom: 20,
  },

  nextGradient: {
    paddingVertical: 18,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});