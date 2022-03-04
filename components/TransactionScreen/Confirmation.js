import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Picker, } from "react-native";
import { Image, Avatar, } from "react-native-elements";
// import RNPickerSelect from "react-native-picker-select";

import {useNavigation} from "@react-navigation/native";


/*---------------------------------- FUNCTION ----------------------------------*/
export default function Confirmation(props) {

const navigation = useNavigation();

const handleSubmit = async () => {
 return navigation.navigate("UserScreen")
}
  
let source = require("../../assets/avatar.png");

  
// let handleSubmit = async () => {
//   let response = await fetch(
//     `https://swapapp-backend.herokuapp.com/users/adress/:`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: `address_street_1=${adress1}&address_zipcode=${cp1}`,
//       // body: JSON.stringify({ address_street_1:adress1,address_zipcode:cp1 })
//     }
//   );
//   response = await response.json();
// };

  return (
    <View style={styles.container}>

            {/* VIGNETTE COLLABORATEUR */}
            <View style={styles.vignette}>

            {/* Touchablewithoutfeedback pour afficher le profil du collaborateur*/}
            <TouchableWithoutFeedback
                        onPress={() => handleSubmit()}
            >
            <View style={{ flexDirection: "row", }}>
              <Avatar rounded size="medium" source={source} />
              <View style={{ marginLeft: 11, }}>
                <Text style={{ marginBottom: 2, fontFamily: "Poppins_600SemiBold" }}>
                  Fredrick
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                    marginTop: 1,
                  }}
                >
                  <Image
                    source={require("../../assets/images/categories/bricolage.png")}
                    style={{ width: 20, height: 20, marginRight: 8,  }}
                  />
                  <View>
                    <Text style={{ marginLeft: 5, maxWidth: 210, maxHeight: 110, fontSize: 13, fontFamily: "Poppins_400Regular"}}>Demande de bricolage</Text>
                  </View>
                </View>
              </View>
            </View>
            
            </TouchableWithoutFeedback>
 
          </View>
          
          {/* BOUTONS ANNULATION/VALIDATION */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              bottom: 260,
            }}
            >
            <TouchableOpacity
              style={styles.button1}
              // onPress={() => props.navigation.navigate("BottomNavigator")}
            >
              <Text style={styles.text1}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              // onPress={() => { setConfirm(true), {/* reducer pour changer status dans le store */} }
              // }
            >
              <Text style={styles.text2}>Confirmer</Text>
            </TouchableOpacity>

          </View>
    </View>
  );
}

// function mapDispatchToProps(dispatch) {
//   return {
//     userStatus: function (status) {
//       dispatch({ type: "userStatus", status});
//     },
//   };
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(Confirmation);



//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 0,
  },
  view1: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: "100%",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 1,
    margin: 0,
  },
  vignette: {
    maxHeight: 250,
    paddingTop: 10,
    paddingBottom: 10,
    width: 330,
    fontSize: 13,
    margin: 15,
    marginTop: 20,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    justifyContent: "center",
  },
  button1: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 160,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  button2: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 160,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 12,
    marginLeft: 19,
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 18,
    // lineHeight: 21,
    letterSpacing: 0.6,
    fontFamily: 'Poppins_700Bold',
  },
  text2: {
    color: "#000000",
    fontSize: 18,
    // lineHeight: 21,
    letterSpacing: 0.6,
    fontFamily: 'Poppins_700Bold',
  },
 
 




});