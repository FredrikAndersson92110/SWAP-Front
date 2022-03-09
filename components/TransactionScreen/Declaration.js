import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Input, Text, Avatar, Image } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";

import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

/*---------------------------------- FUNCTION ----------------------------------*/

  
export default function Declaration({navigation, isAsker, token, category, avatar, firstName }) {
  const [date, setDate] = useState(new Date("01/01/2012"));
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");

  // const navigation = useNavigation();

 let path = `https://theoduvivier.com/swap/${
    category.sub_category
      ? category.sub_category
          .replace(/\s/g, "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      : category.category
          .replace(/\s/g, "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
  }.png`

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date"); // changer
  // };


  const handleDate = (inputDate) => {
    if (
      inputDate.length >= 10 &&
      !inputDate.match(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
      )
    ) {
      setError("Date au mauvais format");
    } else {
      setDate(inputDate);
      console.log("Date enregistrée :", date);
    }
  };

  const incrementTime = () => {
    let timeCopy = Number(time);
    timeCopy += 0.5;
    setTime(timeCopy.toString());
    console.log("time :", time);
  };

  const decrementTime = () => {
    let timeCopy = Number(time);
    if (timeCopy > 0) {
      timeCopy -= 0.5;
      setTime(timeCopy.toString());
      console.log("time :", time);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.all}>
        <View style={styles.vignetcal}>
          {/* VIGNETTE COLLABORATEUR */}
          <View style={styles.vignette}>
            {/* ajouter Touchablewithoutfeedback pour afficher le profil du collaborateur*/}

            <TouchableWithoutFeedback
            // onPress={() => {
            //   props.navigation.navigate("DetailScreen", {
            //     screen: "DetailScreen",
            //   });
            //   console.log('datailscreen')
            // }}
            >
              <View style={{ flexDirection: "row" }}>
                <Avatar rounded size="medium" source={{uri: avatar}} />
                <View style={{ marginLeft: 11 }}>
                  <Text
                    style={{
                      marginBottom: 2,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    {firstName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      marginTop: 1,
                    }}
                  >
                    <Image
                      source={{uri : path}}
                      style={{ width: 20, height: 20, marginRight: 8 }}
                    />
                    <View>
                      <Text
                        style={{
                          marginLeft: 5,
                          maxWidth: 210,
                          maxHeight: 110,
                          fontSize: 13,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Demande de  {category.sub_category ? category.sub_category : category.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* CALENDAR & TIME */}
          {/* <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
            </View> */}
          {/* <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
            </View> */}
          <View style={styles.calendar}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Input
                containerStyle={styles.input1}
                inputStyle={{ fontSize: 13, fontFamily: "Poppins_400Regular" }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder="jj/mm/aaaa"
                onChangeText={(text) => {
                  handleDate(text);
                }}
              />
              <FontAwesome5
                name="calendar-alt"
                size={25}
                color="#F7CE46"
                style={{ marginLeft: 8, marginRight: 15, top: 7 }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.input2}
                placeholder={`${time} h`}
                editable={false}
              />

              {/* <Input
              containerStyle={styles.input2}
              inputStyle={{ fontSize: 13, fontFamily: "Poppins_400Regular", }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholder="Durée"
            /> */}

              <View style={styles.updown}>
                <TouchableOpacity onPress={() => incrementTime()}>
                  <MaterialCommunityIcons
                    name="arrow-up-drop-circle"
                    size={28}
                    color="#F7CE46"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => decrementTime()}>
                  <MaterialCommunityIcons
                    name="arrow-down-drop-circle"
                    size={28}
                    color="#F7CE46"
                    style={{ marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* BOUTON DECLARER */}
        <Text style={styles.error}>{error}</Text>
        <View style={styles.boutonDecl}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => navigation.navigate("BottomNavigator")}
          >
            <Text style={styles.text}>Déclarer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    padding: 0,
  },
  all: {
    // borderWidth: 1,
    // borderColor: "blue",
    alignItems: "center",
    justifyContent: "space-between",
    width: 330,
    maxHeight: 350,
    //   marginTop: 15,
  },
  vignetcal: {
    // borderWidth: 2,
    borderColor: "purple",
  },
  boutonDecl: {
    // borderWidth: 2,
    borderColor: "green",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#F7CE46",
    alignItems: "center",
    justifyContent: "center",
    // bottom: 0,
    width: 330,
    paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
  },
  vignette: {
    maxHeight: 250,
    paddingTop: 10,
    paddingBottom: 10,
    width: 330,
    fontSize: 13,
    margin: 15,
    marginTop: 20,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 15,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    justifyContent: "center",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  input1: {
    height: 40,
    width: 110,
    fontSize: 13,
    marginLeft: 15,
    marginBottom: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  input2: {
    height: 40,
    width: 110,
    fontSize: 13,
    marginLeft: 15,
    marginBottom: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  dropMenu: {
    color: "red",
  },
  updown: {
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "space-between",
    height: 40,
    top: -10,
    marginLeft: 8,
    marginRight: 15,
  },
  text: {
    color: "#000000",
    fontSize: 20,
    lineHeight: 24,
    marginTop: 3,
    fontFamily: "Poppins_600SemiBold",
  },
  error: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginLeft: 15,
    paddingLeft: 15,
    color: "red",
    marginLeft: -5,
  },
});
