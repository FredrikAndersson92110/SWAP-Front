import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default InputButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("ComposeRequestScreen", {
          screen: "ComposeRequestScreen",
        });
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="magnifying-glass" size={24} color="#F7CE46" />
        <Text
          style={{
            padding: 10,
            color: "lightgrey",
            fontFamily: "Poppins_400Regular",
            fontSize: 18,
          }}
        >
          {props.placeHolder}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
