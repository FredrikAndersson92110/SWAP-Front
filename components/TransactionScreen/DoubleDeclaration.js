import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Image, Avatar } from "react-native-elements";
// import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

/*---------------------------------- FUNCTION ----------------------------------*/
export default function DoubleDeclaration() {
  // let source = require("../../assets/img_avatar2.png");
  let source = require("../../assets/avatar.png");

  return (
    <View style={styles.container}>
      <View style={styles.vignette1}>
        {/* ajouter Touchablewithoutfeedback pour afficher le profil du collaborateur*/}      
          <View
            style={{
              flexDirection: "row",
              // borderWidth: 1,
              // borderColor: "blue",
            }}
          >
            <Avatar rounded size="medium" source={source} />
            <View style={{ marginLeft: 11 }}>
              <Text style={{marginBottom: 2, fontFamily: "Poppins_600SemiBold"  }}>
                Fredrick
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 5,
                }}
              >
                <Image
                  source={require("../../assets/images/categories/bricolage.png")}
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <View>
                  <Text style={{ maxWidth: 210, maxHeight: 110,fontSize: 13, fontFamily: "Poppins_400Regular" }}>
                    Demande de bricolage
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.declaration}>
          <View>
            <Text style={styles.titles}>Terminé</Text>
            <Text style={styles.data}>01/05/2022</Text>
          </View>
          <View>
            <Text style={styles.titles}>Durée</Text>
            <Text style={styles.data}>1h30</Text>
          </View>
          </View>
      </View>

      {/* COMMENTAIRE */}
      
      <View style={{ alignSelf: "flex-start" }}>
            <Text
              style={{
                color: "black",
                fontWeight: 'bold',
                marginLeft: 35,
                fontSize: 15,
              }}
            >
              Commentaire
            </Text>
          </View>
          
      <View style={styles.vignette2}>
          <View style={styles.declaration}>
            <Text style={{fontFamily: "Poppins_400Regular"}}>C'était super! C'était super! C'était super! C'était super! C'était super! C'était super! C'était super! C'était super! C'était super! C'était super! C'était super! C'était super!</Text>
          </View>
      </View>
    </View>
  );
}


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
  vignette1: {
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
  vignette2: {
    maxHeight: "17%",
    paddingTop: 10,
    paddingBottom: 10,
    width: 330,
    fontSize: 13,
    margin: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    justifyContent: "center",
  },
  pageTop: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 330,
    // borderWidth: 1,
    // borderColor: "red",
    marginTop: 70,
  },
  declaration: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
    
  },
  titles: {
    marginTop: 25,
    marginLeft: 5,
    fontFamily: "Poppins_600SemiBold",
  },
  data: {
    marginBottom: 2,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
  },

});
