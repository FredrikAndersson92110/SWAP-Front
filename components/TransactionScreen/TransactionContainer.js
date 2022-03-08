import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Picker,
} from "react-native";
import { Overlay, Input, ListItem } from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";

import Confirmation from "./Confirmation";
import Declaration from "./Declaration";
import DoubleDeclaration from "./DoubleDeclaration";

import { useNavigation } from "@react-navigation/native";

import {connect} from 'react-redux'

// import socketIOClient from "socket.io-client";

/*---------------------------------- FUNCTION ----------------------------------*/
function TransactionContainer(props) {
// console.log(">>>> REQUEST:", props.transactionInfos.conversationInfos.messages[0])
const navigation = useNavigation();

const handleSubmit = async () => {
 return navigation.navigate("InteractionsScreen")
}

  const [status, setStatus] = useState(0);
  const [active, setActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [confirm, setConfirm] = useState(false);


  useEffect(() => {
    setStatus(props.transactionInfos.conversationInfos.request.asker_status)
  }, []);
  console.log("USEEFFECT :", props.transactionInfos.conversationInfos.request.asker_status)


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
  } else if (status === 3) {
    color1 = vert;
    color2 = vert;
    color3 = vert;
    transactionStatus = "Vous êtes riche! votre crédit est de 500 heures!! ";
  }

  // affichage des composants selon le statut de la transaction
  var components;
  if (status === 0) {
    if(props.transactionInfos.isAsker) {
    components = <Confirmation 
                    firstName={props.transactionInfos.conversationInfos.conversation_id.firstName}
                    avatar={props.transactionInfos.conversationInfos.conversation_id.user_img}
                    // icon={}
                    category={props.transactionInfos.conversationInfos.request.category}
                    description={props.transactionInfos.conversationInfos.request.description}
                    // disponibility={}
                    // location={}
                    />
                  } else {
    components = <Confirmation 
                    firstName={props.transactionInfos.conversationInfos.request.asker.firstName}
                    avatar={props.transactionInfos.conversationInfos.request.asker.user_img}
                    // icon={}
                    category={props.transactionInfos.conversationInfos.request.category}
                    description={props.transactionInfos.conversationInfos.request.description}
                    // disponibility={}
                    // location={}
                    />  
                  }
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

          {/* COMPOSANTS SELON CONDITIONS BEFORE RETURN */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            {components}
          </View>

          {/* TERNAIRE OVERLAY */}
          {active ? (
            <Overlay
              backdropStyle={{ opacity: 0 }}
              isVisible={true}
              fullscreen
              overlayStyle={styles.overlayFull}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    marginLeft: 15,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Messages
                </Text>
                <TouchableOpacity onPress={() => setActive(false)}>
                  <AntDesign
                    name="close"
                    size={30}
                    color="#000000"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.scrollZone}>
                <View style={{ alignItems: "flex-end" }}>
                  {/* CHAT ZONE MESSAGES */}

                  {/* à dynamiser: {chatMessages} */}
                  <ListItem>
                    <Text style={styles.chatBubbles}>
                      Coucou! tu veux être mon ami?
                      bhjghfjhfhfvhfvjhfvhfhfvkfhkhfjhfhfvhfvjhfvhfhfvkfj;
                      LAZJQDMEHFLRSHGLFJBQFJCBj:fsbq:bjsdfjq:wbHLGJLBjhlv
                    </Text>
                  </ListItem>
                </View>
              </ScrollView>

              {/* INPUT et BOUTON D'ENVOI */}
              <View style={{ flexDirection: "row", marginTop: 18 }}>
                <Input
                  containerStyle={styles.input}
                  inputStyle={{
                    fontSize: 13,
                    fontFamily: "Poppins_400Regular",
                  }}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  placeholder="Messages"
                  onChangeText={(msg) => setCurrentMessage(msg)}
                  value={currentMessage}
                />
                <View style={styles.send}>
                  <TouchableWithoutFeedback
                  // onPress={()=> {socket.emit("sendMessage", {message:currentMessage, pseudo: props.pseudo})}}
                  >
                    <Feather name="send" size={18} color="#000000" />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </Overlay>
          ) : (
            <Pressable style={styles.fakeoverlay1}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onPress={() => setActive(true)}
              >
                {/* une fois dynamisé: {chatMessages} */}

                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 17,
                      marginLeft: 15,
                      marginTop: 10,
                    }}
                  >
                    Messages
                  </Text>

                  {/* CHAT ZONE MESSAGES - SMALL OVERLAY */}
                  <ScrollView style={styles.smallScrollZone}>
                    <View style={{ alignItems: "flex-end" }}>
                      <ListItem style={{ borderRadius: 8 }}>
                        <Text style={styles.chatBubbles}>Coucou!</Text>
                      </ListItem>
                      <ListItem>
                        <Text style={styles.chatBubbles}>
                          Merci pour d'avoir accepté ma demande :. Tu serais
                          disponible quand?
                        </Text>
                      </ListItem>
                      {/* une fois dynamisé: {chatMessages} */}
                    </View>
                  </ScrollView>
                </View>

                {/* INPUT et BOUTON D'ENVOI - SMALL OVERLAY */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 15,
                  }}
                >
                  <Input
                    containerStyle={styles.input}
                    inputStyle={{
                      fontSize: 13,
                      fontFamily: "Poppins_400Regular",
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="Messages"
                    onPressIn={() => setActive(true)}
                  />
                  <View style={styles.send}>
                    <Feather name="send" size={18} color="#000000" />
                  </View>
                </View>
              </TouchableOpacity>
            </Pressable>
          )}

          {/* Fin des composants */}
        </View>
      </View>
    </ImageBackground>
  );
}

{
  /* Success Overlay Atman:
  <Overlay isVisible={overlayVisible} fullScreen>
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


function mapStateToProps(state) {
  return { transactionInfos: state.transactionInfos };
}

export default connect(
  mapStateToProps,
  null
)(TransactionContainer)

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
    // margin: 0,
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
