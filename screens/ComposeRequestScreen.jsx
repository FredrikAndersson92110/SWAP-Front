import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useIsFocused } from "@react-navigation/native";

export default function ComposeRequestScreen(props) {
  const isFocused = useIsFocused();

  const searchInputRef = React.useRef(null);

  const [selected, setSelected] = useState("");
  const data = [
    { label: "Femme", value: "female" },
    { label: "Homme", value: "male" },
    { label: "Non Binaire", value: "non binary" },
  ];

  useEffect(() => {
    if (isFocused) {
      searchInputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View
            style={{
              alignItems: "flex-end",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack()
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* card */}
          <Text style={styles.textTitle}>Catégorie</Text>

          <Input
            placeholder="Trouver un service"
            inputContainerStyle={styles.input}
            containerStyle={{
              paddingHorizontal: 0,
              marginTop: 0,
            }}
            leftIcon={
              <Entypo name="magnifying-glass" size={24} color="#F7CE46" />
            }
            ref={searchInputRef}
            placeholderTextColor={{ color: "blue" }}
          />
          <Text style={styles.textTitle}>Description</Text>

          <TextInput
            textAlignVertical={"top"}
            style={styles.inputTextarea}
            placeholder="Description de votre demande en quelques mots.
          N'hésitez pas à préciser les jours de la semaine ou vous êtes disponible."
            placeholderTextColor="grey"
            numberOfLines={7}
            multiline={true}
          />

          <Text style={styles.textTitle}>Lieu</Text>

          <View style={styles.card}>
            <Dropdown
              style={styles.input}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
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
              selectedStyle={styles.selectedStyle}
              containerStyle={styles.dropContainer}
            />
            {/* <RNPickerSelect
              style={styles.input}
              placeholder={{
                label: "Sélectionnez votre position",
                value: null,
              }}
              onValueChange={(value) => console.log(value)}
              items={[
                {
                  label: "Position actuelle",
                  value: "Position actuelle",
                  inputLabel: "ici!",
                },
                {
                  label: "Adresse principale",
                  value: "Adresse principale",
                },
              ]}
            /> */}
          </View>

          <Text style={styles.textTitle}>Mes disponibilités</Text>

          <TextInput
            style={styles.inputTextarea}
            textAlignVertical={"top"}
            placeholder="Lundi soirs, jeudi et vendredi matin"
            placeholderTextColor="grey"
            numberOfLines={3}
            multiline={true}
          />

          {/* <Button
            title="Suivant"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              props.navigation.navigate("ListRequestScreen", {
                screen: "ListRequestScreen",
              });
            }}
          /> */}

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
    marginTop: 70,
    marginHorizontal: 15,
  },
  input: {
    marginTop: 0,
    paddingLeft: 20,
    marginHorizontal: 6,
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
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 15,
    marginHorizontal: 6,
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
    marginLeft: 10,
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
    height: 60,
    paddingLeft: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    elevation: 6,
    marginHorizontal: 6,
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
});
