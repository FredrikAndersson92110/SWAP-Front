import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button } from "react-native-elements";

export default ErrorScreen = (props) => {
  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.boxTitle}>Ooops...</Text>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.emoji}>😮</Text>
          </View>
          <Text style={styles.textStyle}>Veuillez essayer plus tard</Text>
          <Text style={styles.bodyText}>
            Message d'erreur envoye ici par le backend ou par une condition du
            front
          </Text>
        </View>

        <Button
          title="Retour à l'accueil"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            props.navigation.navigate("Home", {
              screen: "HomeScreen",
            });
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  boxTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 30,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 3,
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 6,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 30,
  },
  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
});
