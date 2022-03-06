import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Input,
} from "react-native";

//Composants
import DropDownCategories from "../components/MoreInfoScreen/DropDownCategories";
import DropDownGender from "../components/MoreInfoScreen/DropDownGender";
import InputBirthDate from "../components/MoreInfoScreen/InputBirthDate";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MoreInfoScreen = (props) => {
  //
  // ─── VALIDATION DU FORMULAIRE ───────────────────────────────────────────────────
  //

  const [error, setError] = useState(null);
  const handleSubmit = async () => {
    if (!props.user.categories) {
      setError("Vous devez selectionner au moins une catégorie");
    } else {
      setError(null);

      let response = await fetch(
        `https://swapapp-backend.herokuapp.com/users/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `firstName=${props.user.firstName}&lastName=${props.user.lastName}&email=${props.user.email}&password=${props.user.password}&birth_date=${props.user.birth_date}&gender=${props.user.gender}&categories=${props.user.categories}`,
        }
      );
      response = await response.json();

      //En cas d'inscription validée, stockage du token en local puis ajout USER dans store
      if (response.user.token) {
        AsyncStorage.setItem("token", response.user.token);
        console.log("REPONSE DU BACK ==> ", response.user);
      }

      //En cas de message d'erreur, on affiche ce dernier sur le front
      if (response.message) {
        setErrorMessage(response.message);
      }
      console.log("navigation");
      return props.navigation.navigate("MyTabs");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={{ marginTop: 50, alignItems: "center" }}>
        {/* ──────────────────── TITLE ──────────────────── */}
        <View style={{ alignSelf: "flex-start", alignItems: "center" }}>
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
            Quelques infos...
          </Text>
        </View>

        {/* ──────────────────── INPUTS ──────────────────── */}
        <View
          style={{
            marginTop: 80,
            marginRight: 20,
            alignContent: "center",
          }}
        >
          <View>
            {/* <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
              </View> */}
            {/* <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
              </View> */}
          </View>

          {/* ──────────────────── DATE DE NAISSANCE ──────────────────── */}
          <Text style={styles.label}>Date de naissance</Text>
          <InputBirthDate />

          {/* ────────────────────GENRE──────────────────── */}
          <Text style={styles.label}>Genre</Text>
          <DropDownGender />

          {/* ────────────────────CATEGORIES──────────────────── */}

          <Text style={styles.label}>Catégories</Text>

          <DropDownCategories />
          <Text style={styles.error}>{error}</Text>
          {/* PHRASE D'EXPLICATION */}
          <Text
            style={{
              color: "grey",
              fontSize: 11,
              marginTop: -10,
              width: 300,
              padding: 15,
              fontFamily: "Poppins_400Regular",
              alignItems: "center",
            }}
          >
            Sélectionner les catégories dans lesquelles vous pourrez aider
            d'autres swapers afin de gagner des crédits de temps.
          </Text>
        </View>
        {/* ──────────────────── BOUTON VALIDER ──────────────────── */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.text}>Valider</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate("MyTabs")}
            >
              <Text style={styles.text}>Valider</Text>
            </TouchableOpacity> */}

        {/* Fin des composants */}
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

  button: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "center",
    width: 330,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
    marginTop: 40,
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

  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 20,
    paddingLeft: 10,
    bottom: -10,
  },
  container1: {
    alignItems: "center",
    // justifyContent: "center",
    height: 40,
    width: 330,
    fontSize: 13,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 3,

    borderWidth: 2,
    borderColor: "orange",
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 330,
    fontSize: 13,
    // margin: 15,
    borderWidth: 2,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    elevation: 3,

    borderWidth: 2,
    borderColor: "red",
  },
  error: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    paddingLeft: 5,
    paddingVertical: 8,
    color: "red",
  },
});

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps, null)(MoreInfoScreen);
