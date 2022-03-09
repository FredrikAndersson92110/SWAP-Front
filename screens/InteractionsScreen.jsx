import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ImageBackground, ScrollView, StyleSheet, Text, View
} from "react-native";
import { connect } from "react-redux";
import Conversation from "../components/InteractionScreeen/Conversation";



/*-----------------------------FUNCTION GLOBALE -------------------------------- */
function InteractionsScreen({ requests, onAddRequests, navigation }) {
  const isFocused = useIsFocused();

  const [message, setMessage] = useState("");

  // chercher les matches sur ResquestSchema
  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          "https://swapapp-backend.herokuapp.com/get-matches/lmHXSZ-XNZnn5fQuXgHcVVbv1Qhn5cFC"
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
  let conversations = [];
  requests.forEach((req) => {
    // si le token du asker est le mien, alors:
    if (req.asker.token === "lmHXSZ-XNZnn5fQuXgHcVVbv1Qhn5cFC") {
      let tempConv = req.conversations.map((conversation) => {
        return {
          ...conversation,
          category: req.category,
          requestId: req._id,
          asker: req.asker,
          request: req,  // la conversation
        };
      });
      conversations = conversations.concat(tempConv);
    } else {
      // si mon token est stocké dans la propriété "conversation_id", je suis helper, et une conversation existe déjà:
      let foundConversation = req.conversations.find(
        (conversation) =>
          conversation.conversation_id.token ===
          "lmHXSZ-XNZnn5fQuXgHcVVbv1Qhn5cFC"
      );
      // si une conversation existe déjà, pusher dans les conversations existantes la category, le requestId et ttes les infos du asker
      if (foundConversation) {
        conversations.push({
          ...foundConversation,
          category: req.category,
          requestId: req._id,
          asker: req.asker,
          request: req, 
          // que doit être affiché?
        });
      }
    }
  });

  //  maps générant les échanges à partir pour CHAQUE conversation, à partir du tableau créé au dessus.
  //  si je suis asker, pour afficher les autres plutôt que ma vignette.
  let requestList = conversations.map((conversation, i) => {
    if (conversation.asker.token === "lmHXSZ-XNZnn5fQuXgHcVVbv1Qhn5cFC") {
      return (
        <Conversation
          key={i}
          conversationInfos={conversation}
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
          key={i}
          conversationInfos={conversation}
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
      <View style={{ marginTop: 50 }}>
        <Text style={styles.boxTitle}>Mes échanges</Text>
      </View>
      <ScrollView style={{ paddingBottom: 50, flex: 1 }}>
        <View style={styles.legendView}>
          <View
            style={{
              height: 12,
              width: 27,
              backgroundColor: "#F7CE46",
              borderRadius: 10,
              marginLeft: 20,
              marginTop: 10,
            }}
          />
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              marginLeft: 15,
              marginTop: 10,
            }}
          >
            Mes demandes d'aide
          </Text>
        </View>
        <View style={styles.legendView}>
          <View
            style={{
              height: 12,
              width: 27,
              backgroundColor: "#253a78",
              borderRadius: 10,
              marginLeft: 20,
              marginTop: 5,
            }}
          />
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              marginLeft: 15,
              marginTop: 5,
            }}
          >
            Mes missions
          </Text>
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
  legendView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
