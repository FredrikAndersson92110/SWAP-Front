import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { Image, Input } from "react-native-elements";
import { connect } from "react-redux";

const SignUpScreen = (props) => {
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
    lowerCaseEmail = email.toLowerCase().trim();

    let emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    //Vérification de l'email (existant ou non?)
    // if (email) {
    //   let checkEmail = await fetch(
    //     `https://swapapp-backend.herokuapp.com/users/check-email/?email=${lowerCaseEmail}`
    //   );
    //   if (checkEmail) {
    //     setErrorMessage("Email déjà utilisé");
    //   }
    // } else {
    //   setErrorMessage("Format de l'email non valide");
    // }

    // 1 - Vérification que tous les champs sont remplis
    if (firstName && lastName && email && password) {
      // 2 - Vérification que l'email est au bon format
      if (lowerCaseEmail.match(emailRegex)) {
        console.log("==format email ok==");
        // 3 - Vérification que email n'existe pas sur la DB
        if (lowerCaseEmail.match(emailRegex)) {
          let checkEmail = await fetch(
            `https://swapapp-backend.herokuapp.com/users/check-email/?email=${lowerCaseEmail}`
          );
          checkEmail = await checkEmail.json();
          console.log("checkEmail ==>", checkEmail);

          if (checkEmail.result == false) {
            //Ajout USER dans le store
            props.saveUser({
              firstName: firstName,
              lastName: lastName,
              email: lowerCaseEmail,
              password: password,
            });
            //On redirige vers MOREINFOS
            return navigation.navigate("MoreInfoScreen");
          } else {
            setErrorMessage("Email déjà utilisé");
          }
        }
      } else {
        setErrorMessage("Format de l'email non valide");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
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
            <Text style={styles.error}>{errorMessage}</Text>
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

          {/* BOUTONS INSCRIPTION */}
          <View style={{ justifyContent: "flex-end" }}>
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
              onPress={() => {
                props.navigation.navigate("SignInScreen");
              }}
            >
              Déjà un compte? Connectez-vous ici
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

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
  text: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.6,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveUser: function (user) {
      dispatch({ type: "saveUser", user });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignUpScreen);
