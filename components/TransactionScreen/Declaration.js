import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Input, Text, Avatar, Image } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
// import RNPickerSelect from "react-native-picker-select";

/*---------------------------------- FUNCTION ----------------------------------*/
export default function Declaration(props) {
  const [date, setDate] = useState(new Date("01/01/2012"));
  const [mode, setMode] = useState("date"); // changer
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0);

  const [selectedValue, setSelectedValue] = useState("java");

  let source = require("../../assets/avatar.png");

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
    showMode("date"); // changer
  };

  //   const showTimepicker = () => {
  //     showMode('time');
  //   };

  const incrementTime = () => {
    setTime(time + 0, 5);
  };

  const decrementTime = () => {
    setTime(time - 0, 5);
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
                <Avatar rounded size="medium" source={source} />
                <View style={{ marginLeft: 11 }}>
                  <Text
                    style={{
                      marginBottom: 2,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    Fredrick
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      marginTop: 1,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/categories/bricolage.png")}
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
                        Demande de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgc Demande de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricoge
                        Demawdrhdjgc
                        Demande de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgc Demande de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricolage Demawdrhdjgcde de bricolage
                        Demawdrhdjgcde de bricoge
                        Demawdrhdjgc
                       
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
              <Input
                containerStyle={styles.input1}
                inputStyle={{ fontSize: 13, fontFamily: "Poppins_400Regular" }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder="jj/mm/aaaa"
                onFocus={() => setShow(true)}
                // value={date}
              />
              <FontAwesome5
                name="calendar-alt"
                size={25}
                color="#F7CE46"
                style={{ marginLeft: 8, marginRight: 15 }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.input2}>
                {/* <Picker
                  selectedValue={selectedValue}
                  // placeholder={{
                  //   label: "Sélectionnez votre position",
                  //   value: null,
                  // }}
                  style={{
                    height: 50,
                    width: 200,
                    backgroundColor: "#000000",
                    color: "red",
                    fontFamily: "Poppins_400Regular",
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                >
                  <Picker.Item
                    style={{ color: "#E7E7E7" }}
                    label="30 mins"
                    value="0.5"
                  />
                  <Picker.Item label="1h" value="1" />
                  <Picker.Item label="1h30" value="1.5" />
                  <Picker.Item label="2h" value="2" />
                  <Picker.Item label="2h30" value="2.5" />
                  <Picker.Item label="3h" value="3" />
                  <Picker.Item label="3h30" value="3.5" />
                  <Picker.Item label="4h" value="4" />
                </Picker> */}
              </View>

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
                    size={16}
                    color="#000000"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => decrementTime()}>
                  <MaterialCommunityIcons
                    name="arrow-down-drop-circle"
                    size={16}
                    color="#000000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* BOUTON DECLARER */}
        <View style={styles.boutonDecl}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("DoubleDeclaration")}
          >
            <Text style={styles.text}>Déclarer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// {/* TEST DROP DOWN */}
// {/* <View style={styles.card}>
//       <RNPickerSelect
//         style={styles.inputTest}
//         placeholder={{
//           label: "Sélectionnez votre position",
//           value: null,
//         }}
//         onValueChange={(value) => console.log(value)}
//         items={[
//           {
//             label: "Position actuelle",
//             value: "Position actuelle",
//             inputLabel: "ici!",
//           },
//           {
//             label: "Adresse principale",
//             value: "Adresse principale",
//           },
//         ]}
//       />
//     </View> */}


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
    borderRadius: 5,
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
    marginLeft: 8,
    marginRight: 15,
  },
  text: {
    color: "#000000",
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.6,
    fontFamily: "Poppins_700Bold",
  },
});
