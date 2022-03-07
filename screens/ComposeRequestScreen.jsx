import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground, StyleSheet, TextInput, TouchableOpacity, View
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownCategories from "../components/MoreInfoScreen/DropDownCategories";
export default function ComposeRequestScreen(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const [selected, setSelected] = useState("");

  const [selectedCat, setSelectedCat] = useState(null);
  let categoriesSelected = [];
  const data = [
    { label: "Femme", value: "female" },
    { label: "Homme", value: "male" },
    { label: "Non Binaire", value: "non binary" },
  ];

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
              props.navigation.goBack();
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          
          {/* ==== CATEGORIES ==== */}
          <Text style={styles.textTitle}>Catégorie</Text>
          <Text>{errorMessage}</Text>

          <DropDownCategories
            placeHolder={selected.label}
            containerStyle={[
              styles.card,
              { height: 100, marginBottom: 200, width: "77%" },
            ]}
            style={{
              width: "100%",
              padding: 15,
              backgroundColor: "white",
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 7,
              borderRadius: 15,
              elevation: 6,
              marginHorizontal: 15,
              paddingHorizontal: 30,
            }}
            onChange={(item) => {
              categoriesSelected = [];
              categoriesSelected.push(item);
              setSelectedCat();
              setSelected(item);
              // if (selectedCat[1]) {
              //   setErrorMessage("Vous ne pouvez choisir qu'une catégorie");
              // }
              console.log("selectedCat", selectedCat);
              // handleCategories();
            }}
          />

          {/* ==== DESCRIPTION ==== */}
          <Text style={styles.textTitle}>Description</Text>

          <TextInput
            textAlignVertical={"top"}
            style={[styles.inputTextarea, { paddingTop: 25 }]}
            placeholder="Description de votre demande en quelques mots.
          N'hésitez pas à préciser les jours de la semaine ou vous êtes disponible."
            placeholderTextColor="grey"
            numberOfLines={7}
            multiline={true}
          />

          {/* ==== LIEU ==== */}
          <Text style={styles.textTitle}>Lieu</Text>

          <View>
            <Dropdown
              style={styles.card}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              dropdownPosition="auto"
              search={false}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={selected.label}
              value={selected}
              onChange={(item) => {
                setSelected(item);
              }}
              containerStyle={styles.dropContainer}
            />
          </View>

          {/* ==== DISPONIBILITES ==== */}
          <Text style={styles.textTitle}>Mes disponibilités</Text>

          <TextInput
            style={[styles.inputTextarea, { paddingTop: 25 }]}
            textAlignVertical={"top"}
            placeholder="Lundi soirs, jeudi et vendredi matin"
            placeholderTextColor="grey"
            numberOfLines={3}
            multiline={true}
          />

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("ListRequestScreen", {
                  screen: "ListRequestScreen",
                });
              }}
            >
              <Text style={styles.text}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
}

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  input: {
    marginTop: 0,
    paddingLeft: 20,
    marginHorizontal: 15,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 50,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  inputTextarea: {
    padding: 20,
    marginHorizontal: 15,
    textAlign: "left",
    backgroundColor: "white",
    fontFamily: "Poppins_400Regular",
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
    fontFamily: "Poppins_700Bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: "100%",
    height: 45,
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 60,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.6,
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    elevation: 6,
    marginHorizontal: 15,
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
    marginLeft: 10,
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "100%",
    fontSize: 13,
    borderWidth: 2,
    paddingLeft: 15,
    borderRadius: 7,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    elevation: 3,
    maxHeight: 100,
  },
  dropContainer: {
    height: 20,
    width: "72%",
    fontSize: 13,
    borderRadius: 7,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    elevation: 3,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  placeholderStyle: {
    color: "grey",
    fontSize: 14,
  },
});
