import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { Button } from "react-native-elements";

export default OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, {  resizeMode: "contain" }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:"92%",
  },
});
