import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const InscriptionScreen = (props) => {
    const navigation = useNavigation();

  //INPUTS
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //ERROR INPUT
  const [errorMessage, setErrorMessage] = useState();

  //HANDLER SUBMIT
  let handleSubmit = async () => {
    //Formatage email en min
    let lowerCaseEmail;
    if (email) {
      lowerCaseEmail = email.toLowerCase();
    }

    let response = await fetch(`http://localhost:3000/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstName=${firstName}&lastName=${lastName}&email=${lowerCaseEmail}&password=${password}`,
    });
    response = await response.json();

    //En cas d'inscription validée, stockage du token en local puis ajout USER dans store
    if (response.user.token) {
      AsyncStorage.setItem("token", response.user.token);
console.log("REPONSE DU BACK ==> ", response.user);
      props.saveUser(response.user);

      //On redirige vers HOME
      return navigation.navigate("HomeScreen");
    }

    //En cas de message d'erreur, on affiche ce dernier sur le front
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
          {/* TITLE */}
          <View style={{ alignSelf: "flex-start" }}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                marginLeft: 18,
                fontSize: 22,
                fontFamily: "Poppins_600SemiBold",
                marginTop: 70,
              }}
            >
              Inscription
            </Text>
          </View>

          {/* INPUTS */}
          <View style={{ marginTop: 30 }}>
            <Text style={styles.error}>{errorMessage}</Text>

            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Prénom"
              onChangeText={(text) => setFirstName(text)}
            />

            {/* <Text style={styles.label}>Nom</Text> */}

            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Nom"
              onChangeText={(text) => setLastName(text)}
            />

            {/* <Text style={styles.label}>Mail</Text> */}

            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Mail"
              onChangeText={(text) => {
                text.toLowerCase();
                setEmail(text);
              }}
            />

            {/* <Text style={styles.label}>Mot de passe</Text> */}

            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              secureTextEntry={true}
              placeholder="Mot de passe"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {/* TITLE */}
          <View>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
                marginTop: 50,
                marginBottom: 15,
              }}
            >
              OU inscrivez-vous avec
            </Text>
          </View>

          {/* MINI LOGO RESEAU */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              width: 200,
              justifyContent: "space-between",
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

          {/* BOUTONS INSCRIPTION */}
          <View style={{ justifyContent: "flex-end", marginBottom: 70 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.text}>Valider</Text>
            </TouchableOpacity>

            <Text
              style={{
                color: "grey",
                fontSize: 13,
                marginTop: 10,
                alignSelf: "center",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Déjà un compte? Connectez-vous ici
            </Text>
          </View>
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
    justifyContent: "center",
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
    width: 330,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    marginTop: 40,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 10,
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
    backgroundColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
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
   saveUser: function(user) {
      dispatch( {type: 'saveUser', user} )
   }
 }
}

export default connect(null, mapDispatchToProps)(InscriptionScreen);