import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button, Avatar, Text } from "react-native-elements";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

import { useFonts } from "expo-font";

export default function DetailScreen(props) {
  let source = require("../assets/img_avatar2.png");

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            {/* Header user */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar rounded size="large" source={source} />
                <View style={{ marginLeft: 20, justifyContent: "center" }}>
                  <Text style={{ fontSize: 22, fontFamily: "Poppins_700Bold" }}>
                    Elisa
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="verified" size={14} color="#F7CE46" />
                    <Text style={{ marginLeft: 5 }}>Profil verifie</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {/* divider */}
            <View style={styles.divider} />
            {/* Content */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../assets/images/categories/bricolage.png")}
                style={{ width: 21, height: 21, marginRight: 10 }}
              />
              <Text style={styles.cardTitle}>Montage de meuble</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
              }}
            >
              <FontAwesome
                name="map-marker"
                size={21}
                color="#F7CE46"
                style={{ marginLeft: 7 }}
              />
              <Text style={styles.bodyText}>5Km (Paris 11eme)</Text>
            </View>

            <View>
              <Text style={styles.textStyle}>Infos</Text>
              <Text style={styles.bodyText}>
                J’ai besoin d’aide pour monter les caissons de cuisine IKEA
              </Text>
            </View>

            <View>
              <Text style={styles.textStyle}>Disponibilites</Text>
              <Text style={styles.bodyText}>
                Lundi matin, jeudi & vendredi soir
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate("TransactionScreen", {
                screen: "TransactionScreen",
              });
            }}
          >
            <Text style={styles.buttonTitle}>Accepter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBlack}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text style={styles.buttonTitleBlack}>Refuser</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    borderBottomColor: "#8B8B8B",
    opacity: 0.5,
    borderBottomWidth: 0.5,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    backgroundColor: "#F7CE46",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
    width: "45%",
  },
  buttonBlack: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
    width: "45%",
  },
  buttonTitleBlack: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginBottom: 15,
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
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
