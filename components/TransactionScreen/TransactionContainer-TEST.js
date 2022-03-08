import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import { Input } from "react-native-elements";
import BottomSheet, { BottomSheetTextInput } from "reanimated-bottom-sheet";
import Confirmation from "./Confirmation";
import Declaration from "./Declaration";
import DoubleDeclaration from "./DoubleDeclaration";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view";

// import socketIOClient from "socket.io-client";

/*---------------------------------- FUNCTION ----------------------------------*/
export default function TransationContainer() {
  const navigation = useNavigation();

  const renderContent = () => (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        height: 680,
        borderWidth: 3,
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

      <ScrollView content={styles.scrollZone}>
        {/* CHAT ZONE MESSAGES */}

        {/* Message received */}
        <View style={{ alignItems: "flex-start" }}>
          <View style={styles.chatBubblesReceived}>
            <Text style={{ margin: 10, color: "white" }}>
              Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours. ☺️
            </Text>
          </View>
        </View>

        {/* Message sent */}
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.chatBubblesSent}>
            <Text style={{ margin: 10 }}>
              Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours. ☺️
            </Text>
          </View>
        </View>

        {/* Message received */}
        <View style={{ alignItems: "flex-start" }}>
          <View style={styles.chatBubblesReceived}>
            <Text style={{ margin: 10, color: "white" }}>
              Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours. ☺️
            </Text>
          </View>
        </View>

        {/* Message sent */}
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.chatBubblesSent}>
            <Text style={{ margin: 10 }}>
              Coucou! tu veux être mon ami? Je suis sobre depuis 37
              jours.Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
              ☺️
            </Text>
          </View>
        </View>
        {/* Message received */}
        <View style={{ alignItems: "flex-start" }}>
          <View style={styles.chatBubblesReceived}>
            <Text style={{ margin: 10, color: "white" }}>
              Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours. ☺️
            </Text>
          </View>
        </View>

        {/* Message sent */}
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.chatBubblesSent}>
            <Text style={{ margin: 10 }}>
              Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours. ☺️
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", margin: 15, bottom: 60 }}>
          <Input
            containerStyle={[styles.input, { margin: 0 }]}
            inputStyle={{
              fontSize: 13,
              fontFamily: "Poppins_400Regular",
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Messages"
            onChangeText={(msg) => setCurrentMessage(msg)}
            value={currentMessage}
          />
        </View>
      </ScrollView>
      {/* INPUT POUR ENVOYER */}
      {/* <KeyboardAvoidingView
        enableAutomaticScroll={false}
        style={{
          height: 20,
          margin: 0,
          bottom: 0,
          backgroundColor: "white",
          width: "130%",
        }}
      ></KeyboardAvoidingView> */}
    </View>
  );

  const handleSubmit = async () => {
    return navigation.navigate("InteractionsScreen");
  };
  const sheetRef = React.useRef(null);

  const [status, setStatus] = useState(1);
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
      <View style={{ marginTop: 20 }}>
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
          <BottomSheet
            ref={sheetRef}
            snapPoints={["20%", "80%"]}
            borderRadius={25}
            renderContent={renderContent}
          >
            <BottomSheetTextInput placeHolder="hello" />
          </BottomSheet>
          {/* Fin des composants */}
        </View>
      </View>
    </ImageBackground>
  );
}

{
  /* <Overlay isVisible={overlayVisible} fullScreen>
<ImageBackground
  style={styles.ImageBackground}
  source={require("../assets/images/background-2.png")}
  resizeMode="cover"
>
  <View style={styles.container}>
    <KeyboardAwareScrollView>
      <View
        style={{
          alignItems: "flex-end",
          marginBottom: 20,
          paddingTop: 50,
        }}
      ></View>

      <Text style={styles.textTitle2}>Demande envoyée ! </Text>

        
      <View style={styles.container}>
            <Image
              style={styles.timeCounter}
              source={require("../assets/images/HomeScreen/timeCounter.png")}
            />
            <Text
              style={
                (styles.boxTitle,
                { fontSize: 25, fontFamily: "Poppins_600SemiBold" })
              }
            >
              {props.user.user_credit}h
            </Text>
            <Text
              style={
                (styles.boxTitle,
                {
                  fontWeight: "700",
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                })
              }
            >
              Crédit temps
            </Text>
          </View>
      <Text style={styles.bodyText}>
       Féliciation!! Fred à confirmé votre SWAP. Vous avez gagné 2h de crédit  temps :D !   </Text>
 
      <Button
        title="Retour à l'accueil"
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("MyTabs");
          toggleOverlay()
        }}

      />
    </KeyboardAwareScrollView>
  </View>
</ImageBackground>
</Overlay> */
}

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
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
    fontFamily: "Poppins_700Bold",
  },
  text2: {
    color: "#000000",
    fontSize: 18,
    marginBottom: 15,
    // lineHeight: 21,
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
  chatBubblesSent: {
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
    margin: 15,
    // marginTop: 0,
    // marginBottom: 0,
  },
  chatBubblesReceived: {
    maxWidth: 250,
    borderRadius: 15,
    backgroundColor: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
    margin: 15,
  },
  fakeoverlay1: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "30%",
    width: "100%",
    elevation: 20,
    position: "absolute",
    bottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  overlayFull: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "97%",
    width: "100%",
    elevation: 4,
    position: "absolute",
    bottom: 0,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  smallScrollZone: {
    maxHeight: 130,
  },
  scrollZone: {
    flex: 1,
    marginTop: 0,
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
