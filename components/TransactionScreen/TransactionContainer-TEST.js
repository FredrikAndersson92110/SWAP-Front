import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Overlay, Input, ListItem, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import Confirmation from "./Confirmation";
import Declaration from "./Declaration";
import DoubleDeclaration from "./DoubleDeclaration";
import BottomSheet from "reanimated-bottom-sheet";

import { useNavigation } from "@react-navigation/native";

// import socketIOClient from "socket.io-client";

/*---------------------------------- FUNCTION ----------------------------------*/
export default function TransationContainer() {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    return navigation.navigate("InteractionsScreen");
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 680,
        borderWidth: 2,
        borderColor: "#f5f5f5",
        borderRadius: 25,

        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: -600,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7.49,
        backgroundColor: "#fcfcfc",
      }}
    >
      <Text style={styles.text2}>Messages</Text>
    </View>
  );

  const sheetRef = React.useRef(null);
  const [status, setStatus] = useState(2);
  const [active, setActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [confirm, setConfirm] = useState(false);

  // dynamise les pastilles
  let vert = "#399F09";
  let jaune = "#F7CE46";
  let gris = "#DDDDDD";
  var transactionStatus;
  var color1;
  var color2;
  var color3;
  if (status === 0) {
    color1 = vert;
    color2 = jaune;
    color3 = gris;
    transactionStatus = "En attente de confirmation";
  } else if (status === 1) {
    color1 = vert;
    color2 = vert;
    color3 = gris;
    transactionStatus = "En attente de déclaration";
  } else if (status === 2) {
    color1 = vert;
    color2 = vert;
    color3 = jaune;
    transactionStatus = "En attente de déclaration du swaper";
  } else {
    color1 = vert;
    color2 = vert;
    color3 = vert;
    transactionStatus = "Vous êtes riche! votre crédit est de 500 heures!! ";
  }

  // dynamise les composants
  var components;
  if (status === 0) {
    components = <Confirmation />;
  } else if (status === 1) {
    components = <Declaration />;
  } else if (status === 2) {
    components = <DoubleDeclaration />;
  }

  let source = require("../../assets/avatar.png");

  // useEffect(() => {
  //   socket.on("sendMessageToAll", (messageData) => {
  //     setListMessage([...listMessage, messageData]);
  //   });
  // }, [listMessage]);

  // var chatMessages = listMessage.map((messageData, i) => {
  //   var msg = messageData.message.replace(/:\)/g, '\u263A');
  //   msg = msg.replace(/:\(/g, '\u2639');
  //   msg = msg.replace(/:p/g, '\uD83D\uDE1B');
  //   var msg = msg.replace(/[a-z]*fuck[a-z]*/gi, '\u2022\u2022\u2022');

  //       return(
  //         <ListItem key={i}>
  //           <ListItem.Content>
  //             <ListItem.Title>{msg}</ListItem.Title>
  //             <ListItem.Subtitle>{messageData.pseudo}</ListItem.Subtitle>
  //           </ListItem.Content>
  //         </ListItem>
  //       )
  //     });

  return (
    <ImageBackground
      source={require("../../assets/images/background-2.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={{ marginTop: 20, backgroundColor: "#0000" }}>
        <View style={styles.view1}>
          {/* PAGE TITLE */}
          <View style={styles.pageTop}>
            <Text
              style={{
                color: "black",
                fontFamily: "Poppins_700Bold",
                marginLeft: 18,
                fontSize: 20,
              }}
            >
              Statut de la demande
            </Text>

            <TouchableWithoutFeedback onPress={() => handleSubmit()}>
              <AntDesign
                name="close"
                size={30}
                color="#000000"
                style={{ marginRight: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={{ alignSelf: "flex-start" }}>
            <Text
              style={{
                color: "black",
                marginLeft: 18,
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
              }}
            >
              {transactionStatus}
            </Text>
          </View>

          {/* PASTILLES DE STATUS */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              width: 280,
              justifyContent: "space-between",
            }}
          >
            <AntDesign name="checkcircle" size={30} color={color1} />
            <View style={styles.traits}></View>
            <AntDesign name="checkcircle" size={30} color={color2} />
            <View style={styles.traits}></View>
            <AntDesign name="checkcircle" size={30} color={color3} />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              width: 330,
              // borderWidth: 1,
              // borderColor: "red",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 10,
                fontFamily: "Poppins_400Regular",
                marginLeft: 1,
              }}
            >
              Mise en relation
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 10,
                fontFamily: "Poppins_400Regular",
                marginLeft: 58,
              }}
            >
              Confirmée
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 10,
                fontFamily: "Poppins_400Regular",
                marginLeft: 75,
              }}
            >
              Déclarée
            </Text>
          </View>

          {/* COMPOSANTS */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            {components}
          </View>

          {/* TERNAIRE OVERLAY */}

          <BottomSheet
            ref={sheetRef}
            snapPoints={["20%", "80%"]}
            borderRadius={25}
            renderContent={renderContent}
          />

          {/* Fin des composants */}
        </View>
      </View>
    </ImageBackground>
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
  },

  text1: {
    color: "#FFFFFF",
    fontSize: 18,
    letterSpacing: 0.6,
    fontFamily: "Poppins_700Bold",
  },
  text2: {
    color: "#000000",
    fontSize: 18,
    letterSpacing: 0.6,
    fontFamily: "Poppins_700Bold",
  },
  traits: {
    backgroundColor: "#000000",
    width: 55,
    height: 1,
    alignSelf: "center",
  },
  pageTop: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 340,
    // borderWidth: 1,
    // borderColor: "red",
    marginTop: 70,
  },
  input: {
    height: 40,
    width: 280,
    fontSize: 13,
    marginLeft: 15,
    marginBottom: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 60,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    fontFamily: "Poppins_400Regular",
  },
  chatBubbles: {
    maxWidth: 250,
    borderRadius: 15,
    backgroundColor: "#F7CE46",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
    // marginTop: 0,
    // marginBottom: 0,
  },

  smallScrollZone: {
    maxHeight: 130,
  },
  scrollZone: {
    flex: 1,
    marginTop: 7,
    // borderBottomWidth: 1,
    borderRadius: 12,
  },
  send: {
    backgroundColor: "#F7CE46",
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});
