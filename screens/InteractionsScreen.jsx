import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

import Conversation from "../components/InteractionScreeen/Conversation";


import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { connect } from "react-redux";


function InteractionsScreen({ requests, onAddRequests, navigation }) {
  const isFocused = useIsFocused();

  const [message, setMessage] = useState("");

  // chercher les matches de requêtes
  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          `https://swapapp-backend.herokuapp.com/get-matches/TrHIXHXCdXrtIrJmIVFusPQSOFgRyQrY`
        );
        let response = await request.json();

        if (response.status) {
          onAddRequests(response.requests);
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);


  // tri des données du requestSchema à récupérer
  //  if (req.asker.token === "TrHIXHXCdXrtIrJmIVFusPQSOFgRyQrY") pour afficher les autres plutôt que ma vignette.
  let conversations = [];
  requests.forEach((req) => {
    if (req.asker.token === "TrHIXHXCdXrtIrJmIVFusPQSOFgRyQrY") {
      let tempConv = req.conversations.map((conversation) => {
        return {
          ...conversation,
          category: req.category,
          requestId: req._id,
          asker: req.asker,
        };
      });
      conversations = conversations.concat(tempConv);
    } else {
      let foundConversation = req.conversations.find(
        (conversation) =>
          conversation.conversation_id.token ===
          "TrHIXHXCdXrtIrJmIVFusPQSOFgRyQrY"
      );
      if (foundConversation) {
        conversations.push({
          ...foundConversation,
          category: req.category,
          requestId: req._id,
          asker: req.asker,
        });
      }
    }
  });

  //  maps générant les échanges à partir du tableau conversation créé au dessus. (contient les messages tchat notamment)
  let requestList = conversations.map((conversation, i) => {
    if (conversation.asker.token === "TrHIXHXCdXrtIrJmIVFusPQSOFgRyQrY") {
      return (
        <Conversation
          request={conversation}
          key={i}
          isAsker={true}
          name={conversation.conversation_id.firstName}
          useravatar={conversation.conversation_id.user_img}
          category={
            conversation.category.sub_category
              ? conversation.category.sub_category
              : conversation.category.category
          }
          lastMessage={
            conversation.messages[conversation.messages.length - 1]
              ? conversation.messages[conversation.messages.length - 1]
              : { message: "" }
          }
        />
      );
    } else {
      return (
        <Conversation
          request={conversation}
          key={i}
          isAsker={false}
          name={conversation.asker.firstName}
          useravatar={conversation.asker.user_img}
          category={
            conversation.category.sub_category
              ? conversation.category.sub_category
              : conversation.category.category
          }
          lastMessage={
            conversation.messages[conversation.messages.length - 1]
              ? conversation.messages[conversation.messages.length - 1]
              : { message: "" }
          }
        />
      );
    }
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      <ScrollView style={{ paddingBottom: 50, flex: 1 }}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.boxTitle}>Mes échanges</Text>
        </View>
        <View style={styles.box}>{requestList}</View>
      </ScrollView>
      {/* <Button
        title={"errorScreen"}
        onPress={() => {
          navigation.navigate("ErrorScreen", { screen: "ErrorScreen" });
        }}
      /> */}
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onAddRequests: function (data) {
      dispatch({ type: "user::requests", requests: data });
    },
  };
}

function mapStateToProps(state) {
  return { requests: state.requestsReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractionsScreen);



//STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  boxTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 30,
  },
  boxText: {
    fontSize: 16,
  },
  box: {
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 300,
  },
  buttonContainer: {
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 10,
    padding: 20,
    width: 310,
    marginBottom: 300,
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    // fontFamily: "Poppins"
  },
});
