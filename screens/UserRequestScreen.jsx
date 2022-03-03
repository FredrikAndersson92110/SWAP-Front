import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Avatar, Text } from "react-native-elements";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

import { useFonts } from "expo-font";

export default function DetailScreen(props) {
  let source = require("../assets/img_avatar2.png");

  const [loaded] = useFonts({
    Poppins_700Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Poppins_400Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      {/* title  */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <Text style={styles.pageTitle}>Profil</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("ListRequestScreen", {
                screen: "ListRequestScreen",
              });
            }}
          >
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* card */}
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
                    <Text
                      style={{
                        marginLeft: 5,
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      Profil vérifié
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#8B8B8B",
                opacity: 0.5,
                borderBottomWidth: 0.5,
                width: "100%",
                marginTop: 20,
              }}
            />
            {/* divider */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ height: "80%" }}
              showsVerticalScrollIndicator={false}
            >
              {/* Content */}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_700Bold",
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 3,
                }}
              >
                Compétences
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/images/categories/bricolage.png")}
                  style={{
                    width: 21,
                    height: 21,
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                />
                <Text style={styles.bodyText}>
                  Bricolage - ( 4 missions effectuees)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/images/categories/bricolage.png")}
                  style={{
                    width: 21,
                    height: 21,
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                />
                <Text style={styles.bodyText}>
                  Bricolage - ( 4 missions effectuees)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/images/categories/bricolage.png")}
                  style={{
                    width: 21,
                    height: 21,
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                />
                <Text style={styles.bodyText}>
                  Bricolage - ( 4 missions effectuees)
                </Text>
              </View>
              {/* divider */}
              <View
                style={{
                  borderBottomColor: "#8B8B8B",
                  opacity: 0.5,
                  borderBottomWidth: 0.5,
                  width: "100%",
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_700Bold",
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 3,
                }}
              >
                Commentaires
              </Text>

              <View>
                <Text style={styles.comments}>Anais</Text>
                <Text style={styles.bodyText}>
                  Je prends des cours de piano avec Elisa plusieurs fois par
                  mois. Elle est ponctuelle et pédagogue.
                </Text>
              </View>

              <View>
                <Text style={styles.comments}>Karim</Text>
                <Text style={styles.bodyText}>
                  Elisa à pu m’aider pour m’occuper de plantes malades. Elles
                  sont maintenant en pleine forme!
                </Text>
              </View>

              <View>
                <Text style={styles.comments}>Marie</Text>
                <Text style={styles.bodyText}>
                  Elisa donne des cours de piano à mon fils qui est débutant,
                  nous sommes très satisfaits.
                </Text>
              </View>

              <View>
                <Text style={styles.comments}>Anais</Text>
                <Text style={styles.bodyText}>
                  Je prends des cours de piano avec Elisa plusieurs fois par
                  mois. Elle est ponctuelle et pédagogue.
                </Text>
              </View>

              <View>
                <Text style={styles.comments}>Anais</Text>
                <Text style={styles.bodyText}>
                  Je prends des cours de piano avec Elisa plusieurs fois par
                  mois. Elle est ponctuelle et pédagogue.
                </Text>
              </View>
            </ScrollView>
          </View>
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
  buttonBlack: {
    color: "white",
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonTitleBlack: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  comments: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 3,
  },
  card: {
    height: "80%",
    backgroundColor: "white",
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
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
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
