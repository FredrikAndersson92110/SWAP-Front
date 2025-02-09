import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image, StyleSheet, useWindowDimensions, View
} from "react-native";

export default OnboardingItem =  ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  image: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  description: {
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
