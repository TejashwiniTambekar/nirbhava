import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colorList } from "../Utils/ColorList";
import logo from "../Assets/Logo/Logo.png"
import InputBox from "../components/InputBox";
import Icon from "react-native-vector-icons/Fontisto"

export default function AllSetScreen(props) {
    return (
        <SafeAreaView style={styles.bgWrapper}>

            <View style={styles.appLogoView}>
                <Image source={logo} style={styles.appLogoImage} resizeMode="contain"></Image>
                <Text style={styles.textStyle}>NIRBHAVA</Text>

            </View>
               <Icon name={'arrow-right-l'} size={20} color="white" />
              

              <Text style={{ color: "#ffffff", textAlign: "center", marginTop: 100, fontSize: 30, fontWeight: "600", }}>
                            <Text style={{ color: '#cc6ea1' }}>ALL</Text> 
                             <TouchableOpacity style={styles.subBtn} activeOpacity={0.7} onPress={()=>props.navigation.replace("Danger")}>
                                              
                            </TouchableOpacity> SET
                        </Text> 

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bgWrapper: {
        flex: 1,
        backgroundColor: colorList.appBgColor
    },
    appLogoView: {
        alignItems: "center",
        marginTop: "35%"
    },
    appLogoImage: {
        height: 60
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 21,
    },
    textView: {
        padding: 50,
    },
    subBtn: {
        backgroundColor: "#e0afcc", borderRadius: 19, padding: 10, marginTop: 50, width: "70%",flexDirection:"row",justifyContent:'center',alignItems:"center"
    },
    subTxt: {
        color: "#ffffff", textAlign: "center", fontSize: 18, fontWeight: "bold",marginRight:10
    },
})