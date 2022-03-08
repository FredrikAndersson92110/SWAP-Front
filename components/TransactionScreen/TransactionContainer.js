import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Input, ListItem, Overlay } from "react-native-elements";
import { connect } from "react-redux";
import Confirmation from "./Confirmation";
import Declaration from "./Declaration";
import DoubleDeclaration from "./DoubleDeclaration";

const TransactionContainer = (props) => {
  let bottom = Platform.OS === "ios" ? 70 : 50;
  const navigation = useNavigation();

//
// ─── CONST CHAT ─────────────────────────────────────────────────────────────────
//
  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(() => ["30%", "50%", "70%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // console.log(">>>> REQUEST:", props.transactionInfos.conversationInfos.messages[0])

  const handleSubmit = async () => {
    return navigation.navigate("InteractionsScreen");
  };

  const [status, setStatus] = useState(0);
  const [active, setActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setStatus(props.transactionInfos.conversationInfos.request.asker_status);
  }, []);
  console.log(
    "USEEFFECT :",
    props.transactionInfos.conversationInfos.request.asker_status
  );

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
    if (props.transactionInfos.isAsker) {
      components = (
        <Confirmation
          firstName={
            props.transactionInfos.conversationInfos.conversation_id.firstName
          }
          avatar={
            props.transactionInfos.conversationInfos.conversation_id.user_img
          }
          // icon={}
          category={props.transactionInfos.conversationInfos.request.category}
          description={
            props.transactionInfos.conversationInfos.request.description
          }
          // disponibility={}
          // location={}
        />
      );
    } else {
      components = (
        <Confirmation
          firstName={
            props.transactionInfos.conversationInfos.request.asker.firstName
          }
          avatar={
            props.transactionInfos.conversationInfos.request.asker.user_img
          }
          // icon={}
          category={props.transactionInfos.conversationInfos.request.category}
          description={
            props.transactionInfos.conversationInfos.request.description
          }
          // disponibility={}
          // location={}
        />
      );
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



  //
  // ────────────────────────────────────────────────────── I ──────────
  //   :::::: R E N D E R S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  //
  
  return (
    <View style={styles.container}>
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

          {/* Fin des composants */}
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        onChange={handleSheetChanges}
        style={{
          alignItems: "center",
          marginTop: 60,
          justifyContent: "center",
        }}
      >
        <View style={styles.contentContainer}>
          <View style={{ width: "100%", marginLeft: 15, marginTop: 20 }}>
            <Text style={styles.titre}>Messages</Text>
          </View>

          <ScrollView content={styles.scrollZone}>
            {/* CHAT ZONE MESSAGES */}

            {/* Message received */}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.chatBubblesReceived}>
                <Text style={{ margin: 10, color: "white" }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message sent */}
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.chatBubblesSent}>
                <Text style={{ margin: 10 }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message received */}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.chatBubblesReceived}>
                <Text style={{ margin: 10, color: "white" }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message sent */}
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.chatBubblesSent}>
                <Text style={{ margin: 10 }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37
                  jours.Coucou! tu veux être mon ami? Je suis sobre depuis 37
                  jours. ☺️
                </Text>
              </View>
            </View>
            {/* Message received */}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.chatBubblesReceived}>
                <Text style={{ margin: 10, color: "white" }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message sent */}
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.chatBubblesSent}>
                <Text style={{ margin: 10 }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 370,
            alignItems: "center",
            marginBottom: bottom,
          }}
        >
          <BottomSheetTextInput
            style={[styles.input, { paddingBottom: 0 }]}
            keyboardBehavior={"fullScreen"}
            android_keyboardInputMode={"adjustResize"}
          />
          <TouchableOpacity
          // onPress={()=> {socket.emit("sendMessage", {message:currentMessage, pseudo: props.pseudo})}}
          >
            <View
              style={{
                backgroundColor: "#F7CE46",
                padding: 10,
                borderRadius: 50,
                margin: 20,
                shadowColor: "#171717",
                shadowOffset: { width: 1, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 7,
                elevation: 7,
              }}
            >
              <Feather name="send" size={18} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

function mapStateToProps(state) {
  return { transactionInfos: state.transactionInfos };
}

export default connect(mapStateToProps, null)(TransactionContainer);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "lightgrey",
    width: "100%",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
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
  contentContainer: {
    flex: 1,
    width: 370,
    alignItems: "center",
    marginTop: 0,
    // borderWidth: 2,
    // borderColor: "red",
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
    width: 300,
    height: 40,
    // marginBottom: { bottom },
    borderRadius: 20,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    paddingTop: 0,
    paddingLeft: 18,
    backgroundColor: "rgba(151, 151, 151, 0.15)",
  },
  chatBubblesSent: {
    maxWidth: 250,
    borderRadius: 15,
    backgroundColor: "#F7CE46",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
    marginLeft: 100,
    marginRight: 15,
  },
  send: {
    backgroundColor: "#F7CE46",
    position: "relative",
    bottom: 40,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
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
    marginLeft: 15,
    marginRight: 100,
  },
  scrollZone: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    marginTop: 0,
    borderWidth: 2,
    borderColor: "red",
  },
  titre: {
    color: "#000000",
    fontSize: 18,
    marginBottom: 15,
    // lineHeight: 21,
    letterSpacing: 0.6,
    fontFamily: "Poppins_700Bold",
  },
});


