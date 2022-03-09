import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownCategories from "../components/MoreInfoScreen/DropDownCategories";
import * as Location from "expo-location";
import { connect } from "react-redux";
const ComposeRequestScreen = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState("");
  let categoriesSelected = [];

  // console.log(" <<<<<<<<<<<<< USER >>>>>>>>>>>>>>", props.user);

  const data = [
    { label: "Ma position actuelle", value: "geolocation" },
    {
      label: props.user.userAddresses[0].address_street_1
        ? `${props.user.userAddresses[0].address_street_1}, ${props.user.userAddresses[0].address_city}`
        : "Ajoutez une addresse depuis votre profil",
      value: "address1",
    },
    {
      label: props.user.userAddresses[1].address_street_1
        ? `${props.user.userAddresses[1].address_street_1}, ${props.user.userAddresses[1].address_city}`
        : "Ajoutez une addresse depuis votre profil",
      value: "address2",
    },
  ];
  // 4 valeurs INPUTS
  let addressObj;
  const [selectedAddress, setSelectedAddress] = useState("");
  const [description, setDescription] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const handleLocation = async (location) => {
    // Récupération de la géolocalisation si choix utilisateur
    if (location.value == "geolocation") {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        let geocode = await Location.getCurrentPositionAsync();
        let address = await Location.reverseGeocodeAsync({
          latitude: geocode.coords.latitude,
          longitude: geocode.coords.longitude,
        });
        addressObj = {
          address_street_1: address[0].name,
          address_zipcode: address[0].postalCode,
          address_city: address[0].city,
        };
        setSelectedAddress(addressObj);
        console.log("choix localisation =>", addressObj);
      }
    } else if (location.value == props.user.userAddresses[0].address_street_1) {
      console.log("choix 1 =>", location.value);
      addressObj = {
        address_street_1: props.user.userAddresses[0].address_street_1,
        address_zipcode: props.user.userAddresses[0].address_zipcode,
        address_city: props.user.userAddresses[0].address_city,
      };
      setSelectedAddress(addressObj);
    } else if (location.value == props.user.userAddresses[1].address_street_1) {
      addressObj = {
        address_street_1: props.user.userAddresses[1].address_street_1,
        address_zipcode: props.user.userAddresses[0].address_zipcode,
        address_city: props.user.userAddresses[0].address_city,
      };
      setSelectedAddress(addressObj);
      console.log("choix 2 =>", location.value);
    }
  };
  const handleSubmit = () => {
    selectedCat.length > 1
      ? setErrorMessage("Vous ne pouvez choisir qu'une seul categorie")
      : null;
    if (
      selectedAddress == "" ||
      description == "" ||
      disponibility == "" ||
      selectedCat == ""
    ) {
      setErrorMessage("Merci de remplir tous les champs");
    } else {
      let data = {
        description: description,
        disponibility: disponibility,
        category: selectedCat[0],
        address_street_1: selectedAddress.address_street_1,
      };
      console.log(data);
      props.onComposeRequest(data);
    }
  };
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
          {/* ==== LIEU ==== */}
          <Text style={styles.textTitle}>Lieu</Text>
          <View>
            <Dropdown
              style={[styles.card]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              dropdownPosition="auto"
              search={false}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={selected.label}
              onChange={(item) => {
                setSelected(item);
                handleLocation(item);
              }}
              containerStyle={[styles.dropContainer, { height: 0 }]}
            />
          </View>

          {/* ==== CATEGORIES ==== */}
          <Text style={[styles.textTitle, { marginBottom: 0 }]}>Catégorie</Text>

          <DropDownCategories
            placeHolder={"Choisissez une catégorie"}
            containerStyle={[
              styles.card,
              {
                height: 100,
                marginBottom: 200,
                width: "77%",
                paddingHorizontal: 20,
                paddingVertical: 10,
              },
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
              setSelectedCat(item);
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
            onChangeText={(text) => {
              setDescription(text.trim());
            }}
          />

          {/* ==== DISPONIBILITES ==== */}
          <Text style={styles.textTitle}>Mes disponibilités</Text>

          <TextInput
            style={[styles.inputTextarea, { paddingTop: 25 }]}
            textAlignVertical={"top"}
            placeholder="Lundi soirs, jeudi et vendredi matin"
            placeholderTextColor="grey"
            numberOfLines={3}
            multiline={true}
            onChangeText={(text) => setDisponibility(text.trim())}
          />
          <Text style={styles.error}>{errorMessage}</Text>
        </KeyboardAwareScrollView>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
              props.navigation.navigate("ListRequestScreen", {
                screen: "ListRequestScreen",
              });
            }}
          >
            <Text style={styles.text}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return { user: state.userReducer, request: state.newRequest };
}

function mapDispatchToProps(dispatch) {
  return {
    onComposeRequest: function (newRequest) {
      dispatch({ type: "composeRequest::newRequest", newRequest });
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeRequestScreen);
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
    marginBottom: 45,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  error: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 15,
    marginTop: 10,
    paddingLeft: 15,
    bottom: -10,
    color: "red",
  },
});
