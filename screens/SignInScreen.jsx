import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { Image, Input } from "react-native-elements";
import { connect } from "react-redux";

const SignInScreen = (props) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errorMessage, setErrorMessage] = useState();

  let handleSubmit = async () => {
    let lowerCaseEmail;

    if (email) {
      lowerCaseEmail = email.toLowerCase().trim();
    }

    // Véririfcation du couple Mail/MDP en backend
    let response = await fetch(
      `https://swapapp-backend.herokuapp.com/users/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${lowerCaseEmail}&password=${password}`,
      }
    );
    response = await response.json();

    // Si le couple Mail/MDP est valide
    if (response.status === true) {
      //On enregistre le Token en local pour une future connexion
      AsyncStorage.setItem("token", response.user.token);
      props.saveUser(response.user);
      //On redirige vers HOME
      return navigation.navigate("MyTabs");
    }

    // Si un message d'erreur est retourné, on l'affiche
    if (response.message) {
      setErrorMessage(response.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={{ marginTop: 50 }}>
        <View style={styles.view1}>
          {/* PAGE TITLE */}
          <View style={{ alignSelf: "flex-start" }}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                marginLeft: 18,
                fontSize: 22,
                fontFamily: "Poppins_700Bold",
                marginTop: 70,
              }}
            >
              Connexion
            </Text>
          </View>

          {/* INPUTS */}
          <View style={{ marginTop: 80 }}>
            <Text style={styles.label}>Email</Text>
            <Input
              // mode= 'outlined'
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Mail"
              onChangeText={(text) => {
                text.toLowerCase();
                setEmail(text);
              }}
            />
            <Text style={styles.label}>Mot de passe</Text>

            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              secureTextEntry={true}
              placeholder={"Enter Password"}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.error}>{errorMessage}</Text>
          </View>

          {/* PHRASE CONNEXION VIA RESEAUX */}
          <View>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
                marginTop: 120,
                marginBottom: 15,
              }}
            >
              {" "}
              OU connectez-vous avec{" "}
            </Text>
          </View>

          {/* MINI LOGO RESEAU */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              width: 200,
              justifyContent: "space-between",
              // borderWidth: 1,
              // borderColor: "red",
            }}
          >
            <Image
              source={require("../assets/images/GroupIcons/Group40.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../assets/images/GroupIcons/Group41.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../assets/images/GroupIcons/Group42.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          {/* BOUTON VALIDER*/}
          <View
            style={{
              justifyContent: "flex-end",
              position: "absolute",
              bottom: Dimensions.get("window").height * 0.07,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.text}>Connexion</Text>
            </TouchableOpacity>

            {/* PHRASE REDIRECTION VERS INSCRIPTION */}

            <Text
              style={{
                color: "grey",
                fontSize: 13,
                marginTop: 10,
                alignSelf: "center",
                fontFamily: "Poppins_400Regular",
              }}
              onPress={() => {
                props.navigation.navigate("SignUpScreen");
              }}
            >
              Pas encore de compte? S'inscrire
            </Text>
          </View>

          {/* Fin des composants */}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  view1: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  button: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.85,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
    marginTop: 50,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 10,
    width: Dimensions.get("window").width * 0.85,
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.6,
  },
  input: {
    height: 40,
    width: Dimensions.get("window").width * 0.85,
    fontSize: 13,
    margin: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    marginLeft: 15,
    paddingLeft: 15,
    bottom: -10,
  },
  error: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 15,
    paddingLeft: 15,
    bottom: -10,
    color: "red",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveUser: function (user) {
      dispatch({ type: "saveUser", user });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignInScreen);
