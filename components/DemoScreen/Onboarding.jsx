import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import slides from "./slides";


export default Onboarding = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
 
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={true}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <Button
        title={"Inscription"}
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      />
      <Text
        style={styles.connectionText}
        onPress={() => {
          navigation.navigate("SignInScreen");
        }}
      >
        Déjà un compte? Connectez-vous
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },

  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
  },
  buttonContainer: {
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    padding: 20,
    width: 310,
  },
  buttonTitle: {
    color: "black",
    fontSize: 19,
    fontWeight: "700",
    fontFamily: "Poppins_600SemiBold",
  },
  connectionText: {
    position: "relative",
    bottom: 40,
    fontSize: 14,
    color: "grey",
    marginTop: 40,
  },
});
