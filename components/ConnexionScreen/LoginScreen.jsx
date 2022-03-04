import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFonts } from "expo-font";

export default function LoginScreen(props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errorMessage, setErrorMessage] = useState();

  let handleSubmit = async () => {
    let lowerCaseEmail;

    if (email) {
      lowerCaseEmail = email.toLowerCase();
    }

    // Véririfcation du couple Mail/MDP en backend
    let response = await fetch(`http://localhost:3000/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${lowerCaseEmail}&password=${password}`,
    });
    response = await response.json();

    // Si le couple Mail/MDP est valide
    if (response.status === true) {
      //On enregistre le Token en local pour une future connexion
      AsyncStorage.setItem("token", response.user.token);

      //On redirige vers HOME
      return navigation.navigate("HomeScreen");
    }

    // Si un message d'erreur est retourné, on l'affiche
    if (response.message) {
      setErrorMessage(response.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background-2.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={{ marginTop: 50 }}>
      <KeyboardAwareScrollView>
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

          {/* BOUTON VALIDER*/}
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.text}>Connexion</Text>
            </TouchableOpacity>
          </View>

          {/* PHRASE REDIRECTION VERS INSCRIPTION */}
          <View>
            <Text
              style={{
                color: "grey",
                fontSize: 13,
                marginTop: 10,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Pas encore de compte? S'inscrire
            </Text>
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
              source={require("../../assets/images/GroupIcons/Group40.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../../assets/images/GroupIcons/Group41.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../../assets/images/GroupIcons/Group42.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          {/* Fin des composants */}
        </View>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
}

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
    width: 330,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
    marginTop: 50,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 10,
    padding: 15,
    width: 310,
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.6,
  },
  input: {
    height: 40,
    width: 330,
    fontSize: 13,
    margin: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 5,
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
