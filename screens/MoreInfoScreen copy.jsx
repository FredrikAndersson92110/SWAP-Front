import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
// import { Input } from "react-native-elements";
// import DatePicker from "react-native-datepicker";
// import DateField from 'react-native-datefield';
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";

//Composants
import DropDownCategories from "../components/MoreInfoScreen/DropDownCategories";
import DropDownGender from "../components/MoreInfoScreen/DropDownGender";

export default function MoreInfoScreen(props) {
  //
  // ─── VALIDATION DU FORMULAIRE ───────────────────────────────────────────────────
  //
  const handleSubmit = () => {};

  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  //   const showTimepicker = () => {
  //     showMode('time');
  //   };

  return (
    <ImageBackground
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <View style={styles.view1}>
          {/* PAGE TITLE */}
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
          {/* INPUTS */}
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
              {/* {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )} */}
            </View>
            {/* <Text style={styles.label}>Date de naissance</Text>
            <Input
              containerStyle={styles.input}
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="jj/mm/aaaa"
              onFocus={() => setShow(true)}
              value={date}
            /> */}
            {/* ────────────────────GENRE──────────────────── */}
            <Text style={styles.label}>Genre</Text>
            <DropDownGender />

            {/* ────────────────────CATEGORIES──────────────────── */}

            <Text style={styles.label}>Catégories</Text>
            <DropDownCategories />
            {/* PHRASE D'EXPLICATION */}
            <Text
              style={{
                color: "black",
                fontSize: 13,
                marginTop: 10,
                width: 320,
                fontFamily: "Poppins_400Regular",
                alignItems: "center",
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
    borderWidth: 2,
    borderColor: "green",
  },
  view1: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "green",
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
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginLeft: 15,
    paddingLeft: 15,
    bottom: -10,
  },
  container1: {
    alignItems: "center",
    // justifyContent: "center",
    height: 40,
    width: 330,
    fontSize: 13,
    margin: 15,
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
  select1: {
    flex: 1,
    margin: 2,
    height: "100%",
    width: 330,
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderColor: "#E7E7E7",
    backgroundColor: "red",
    borderRadius: 5,

    borderWidth: 2,
    borderColor: "red",
  },
});
