import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Overlay } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const CustomButton = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Overlay
          isVisible={modalVisible}
          backdropStyle={{ opacity: 0 }}
          onBackdropPress={() => setModalVisible(!modalVisible)}
          overlayStyle={{
            elevation: 0,
            shadowOpacity: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "#F7CE46",
            width: "100%",
            height: "8%",
            position: "absolute",
            bottom: 70,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <TouchableOpacity
            title="FLash"
            type="clear"
            onPress={() => {
              navigation.navigate("HelpScreen");
              setModalVisible(!modalVisible);
            }}
            style={{
              alignItems: "center",
              padding: 10,
            }}
            buttonStyle={{ flexDirection: "column" }}
          >
            <FontAwesome5 name="handshake" size={20} color="black" />
            <Text style={{ color: "black", fontFamily: "Poppins_500Medium" }}>
              Aider
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="FLash"
            type="clear"
            onPress={() => {
              navigation.navigate("AskScreen");
              setModalVisible(!modalVisible);
            }}
            style={{ alignItems: "center", padding: 10 }}
            buttonStyle={{ flexDirection: "column" }}
          >
            <Entypo name="hand" size={20} color="black" />
            <Text style={{ color: "black", fontFamily: "Poppins_500Medium" }}>
              Demander
            </Text>
          </TouchableOpacity>
        </Overlay>
        <View
          style={{
            position: "absolute",
            bottom: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback
            activeOpacity={0.6}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                backgroundColor: "#F7CE46",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 18,
                  zIndex: 10,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                SWAP
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomButton;
