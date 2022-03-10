import { useIsFocused } from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Button, Overlay, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputButton from "../components/InputButton";
import { connect } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import Card from "../components/ListRequestScreen/Card";

function ListRequestScreen({
  navigation,
  composeRequest,
  selectedUsers,
  user,
  onResetSelectedUsers,
}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function getUsers() {
        let request = await fetch(
          `http://192.168.10.137:3000/users-by-category/${composeRequest.category}`
        );
        let response = await request.json();
        if (response.status) {
          setFoundUsers(response.foundUsers);
        } else {
          setMessage(response.message);
        }
      }
      getUsers();
    }
  }, [isFocused]);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleSubmit = async () => {
    let request = await fetch("http://192.168.10.137:3000/add-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...composeRequest,
        userToken: user.token,
        selectedUsers,
      }),
    });
    let response = await request.json();

    if (response.status) {
      onResetSelectedUsers();
      toggleOverlay();
    }
  };

  let userList = foundUsers.map((user, i) => {
    return (
      <Card
        key={i}
        firstName={user.firstName}
        category={composeRequest.category}
        avatar={user.user_img}
        selectedUser={user}
      />
    );
  });

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View
          style={{
            alignItems: "flex-end",
            marginBottom: 20,
            marginRight: 15,
            paddingTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* card */}

          <InputButton
            style={{
              paddingLeft: 13,
              textAlign: "left",
              backgroundColor: "white",
              borderRadius: 50,
              height: 40,
              color: "lightgrey",
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 7,
              elevation: 6,
              borderBottomWidth: 0,
              marginBottom: 10,
              marginTop: 7,
              marginHorizontal: 15,
            }}
            placeHolder={composeRequest.category}
          />

          <TouchableOpacity
            style={{
              paddingLeft: 13,
              textAlign: "left",
              backgroundColor: "white",
              borderRadius: 50,
              height: 40,
              color: "lightgrey",
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 7,
              elevation: 6,
              borderBottomWidth: 0,
              marginBottom: 20,
              marginTop: 0,
              marginHorizontal: 15,
            }}
            activeOpacity={1}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  padding: 10,
                  color: "lightgrey",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 18,
                }}
              >
                Lieu : {composeRequest.address_street_1}
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={[styles.bodyText, { paddingHorizontal: 10, fontSize: 13 }]}
          >
            Choisissez au moins 2 swapers à qui envoyer votre demander. D'autres
            swapers pourront également vous proposer leur aide une fois votre
            demande d'aide publiée.
          </Text>

          <Text style={styles.textTitle}>Les profils qui correspondent</Text>

          {userList}

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonValidate}
              onPress={handleSubmit}
            >
              <Text style={styles.text}>Valider</Text>
            </TouchableOpacity>
          </View>

          <Overlay
            isVisible={overlayVisible}
            fullScreen
            overlayStyle={{ padding: 0 }}
          >
            <ImageBackground
              style={styles.ImageBackground}
              source={require("../assets/images/background-2.png")}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <View
                  style={{
                    alignItems: "flex-end",
                    marginBottom: 20,
                    paddingTop: 50,
                  }}
                ></View>

                <Text style={styles.textTitle2}>Demande envoyée ! </Text>

                <View style={styles.container2}>
                  <AntDesign name="checkcircle" size={100} color="#F7CE46" />
                </View>

                <Text style={styles.bodyText}>
                  Les Swapers sélectionnés recevront une notification concernant
                  votre demande.
                </Text>
                <Text style={styles.bodyText}> </Text>
                <Text style={styles.bodyText}>
                  Votre demande sera consultable par d'autres Swapers qui ont
                  les compétences requise. Ils pourront proposer de vous venir
                  en aide.
                </Text>

                <Button
                  title="Retour à l'accueil"
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonContainer}
                  onPress={() => {
                    toggleOverlay();
                    navigation.navigate("Home");
                  }}
                />
              </View>
            </ImageBackground>
          </Overlay>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onAddRequests: function (data) {
      dispatch({ type: "user::requests", requests: data });
    },
    onResetSelectedUsers: function () {
      dispatch({ type: "reset::selected" });
    },
  };
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    requests: state.requestsReducer,
    composeRequest: state.composeRequestReducer,
    categoryMatches: state.categoriesReducer,
    userDetails: state.userDetailsReducer,
    selectedUsers: state.selectedReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRequestScreen);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
    marginBottom: 140,
  },
  containerCheckBox: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
  },
  input: {
    paddingLeft: 20,
    marginHorizontal: 6,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  inputTextarea: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 15,
    marginHorizontal: 6,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  textTitle2: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.6,
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    paddingBottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
  },
  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonValidate: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.85,
    height: 45,
    borderRadius: 8,
    marginBottom: 45,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 60,
    padding: 15,
  },
  buttonTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    elevation: 6,
    marginHorizontal: 13,
    paddingBottom: 20,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 10,
  },
  bodyText: {
    color: "#717171",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginLeft: 25,
    paddingHorizontal: 20,
    marginRight: 25,
  },
  bodyText2: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
  },
  icon: {
    marginRight: 10,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
