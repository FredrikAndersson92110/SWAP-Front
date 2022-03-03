import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Button,
  Picker,
} from "react-native";
import { Image, Input } from "react-native-elements";
// import DatePicker from "react-native-datepicker";
// import DateField from 'react-native-datefield';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFonts } from "expo-font";

export default function ConnexionScreen(props) {
  const [selectedValue, setSelectedValue] = useState("java");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //   const showTimepicker = () => {
  //     showMode('time');
  //   };

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
                fontFamily: "Poppins_600SemiBold",
                marginTop: 70,
              }}
            >
              Quelques infos...
            </Text>
          </View>

          {/* INPUTS */}
          <View style={{ marginTop: 80 }}>
            <View>
              {/* <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
              </View> */}
              {/* <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
              </View> */}
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            <Text style={styles.label}>Date de naissance</Text>
            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="jj/mm/aaaa"
              onFocus={() => setShow(true)}
              value={date}
            />

            <Text style={styles.label}>Genre</Text>

             <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="sélectionner votre genre"
            /> 

            <View>

            </View>

            <Text style={styles.label}>Catégories</Text>

            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="ajouter des catégories"
            />
          </View>

          {/* PHRASE D'EXPLICATION */}
          <View>
            <Text
              style={{
                color: "black",
                fontSize: 13,
                marginTop: 10,
                width: 320,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Sélectionner les catégories dans lesquelles vous pourrez aider
              d'autres swapers afin de gagner des crédits de temps.
            </Text>
          </View>

          {/* BOUTON VALIDER*/}
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate("HomeScreen")}
            >
              <Text style={styles.text}>Valider</Text>
            </TouchableOpacity>
          </View>

          {/* Fin des composants */}
        </View>
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
    marginTop: 160,
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
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    marginLeft: 15,
    paddingLeft: 15,
    bottom: -10,
  },
});
