import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import logo from "../Assets/Logo/Logo.png"
import { colorList } from '../Utils/ColorList';
export default function Splash(props) {

    useEffect(() => {
        const timer = setTimeout(() => {
            // Replace 'Home' with the screen you want to navigate to
            props.navigation.replace('Login');
        }, 2000);
    }, [])

    return (
        <View style={styles.bgwrapper}>
            <Image source={logo} style={{ height: "30%" }} resizeMode="contain" />
            <View style={styles.textView}>
                {/* <Text style={styles.text}>
                    Devotion · Tradition · Knowledge
                </Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    bgwrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: colorList.appBgColor
    },
    textView: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
    }
});

