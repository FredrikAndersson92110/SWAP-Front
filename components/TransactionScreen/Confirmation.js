import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
} from "react-native";
import { Image, Avatar } from "react-native-elements";
// import RNPickerSelect from "react-native-picker-select";

import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";


/*---------------------------------- FUNCTION ----------------------------------*/
function Confirmation({firstName, avatar, description, category, token, isAsker, requestId, updateTransaction, transactionInfos}) {
  const navigation = useNavigation();

 
  let source = require("../../assets/avatar.png");

  let path = `https://theoduvivier.com/swap/${
                    category.sub_category
                      ? category.sub_category
                          .replace(/\s/g, "_")
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                      : category.category
                          .replace(/\s/g, "_")
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                  }.png`

          //  ds postman >>  http://localhost:3000/users/update-status/621f909ca32dff786faa7a17/yDpr8ca7LpbeHj4UdGsD-YDUxlntEsA4
          // quand GIT:  https://swapapp-backend.herokuapp.com
    let changeStatus = async () => {
      let rawResponse = await fetch( `http://192.168.10.151:3000/users/update-status/${requestId}/${token}`,  {
          method: "PUT",    // ok changement de status dans BDD
        }
      )
    let response = await rawResponse.json();
   
      // console.log('STATUS DE LA REPONSE ROUTE:', response.status)  ---> réponse : true
    if (response.status) {
      console.log('NOUVEAU STATUS:', response.updatedRequest) // ---> réponse avec .conversation_id = undefined
      updateTransaction(response.updatedRequest, isAsker)
    }
  }
    

     return (
      <View style={styles.container}>
        {/* VIGNETTE COLLABORATEUR */}
        <View style={styles.vignette}>
          {/* Touchablewithoutfeedback pour afficher le profil du collaborateur*/}
          <TouchableWithoutFeedback>
            <View style={{ flexDirection: "row" }}>
              <Avatar rounded size="medium" source={{uri: avatar}} />
              <View style={{ marginLeft: 11 }}>
                <Text
                  style={{ marginBottom: 2, fontFamily: "Poppins_600SemiBold" }}
                >
                  {firstName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 1,
                  }}
                >
                  <Image
                    source={{uri : path}}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <View>
                    <Text
                      style={{
                        marginLeft: 5,
                        maxWidth: 210,
                        maxHeight: 110,
                        fontSize: 13,
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      Demande de {category.sub_category ? category.sub_category : category.category}
                    </Text>
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

          {isAsker ?
          <TouchableOpacity
            style={styles.button2}
            onPress={() => changeStatus()}
          >
            <Text style={styles.text2}>Confirmer</Text>
          </TouchableOpacity> : null
           }

        </View>
      </View>
    );
  } 

function mapDispatchToProps(dispatch) {
  return{
    updateTransaction: function (data, isAsker) {
      dispatch ({ type : "getTransactionInfos", transactionInfos: {conversationInfos : data, isAsker: isAsker} })
    }
  }
}

function mapStateToProps(state) {
  return { transactionInfos: state.transactionInfos };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);


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
    borderRadius: 15,
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
    fontSize: 20,
    lineHeight: 24,
    marginTop: 3,
    fontFamily: "Poppins_600SemiBold",
  },
  text2: {
    color: "#000000",
    fontSize: 20,
    lineHeight: 24,
    marginTop: 3,
    fontFamily: "Poppins_600SemiBold",
  },
});
