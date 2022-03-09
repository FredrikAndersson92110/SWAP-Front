import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Image, Avatar, Overlay, Button } from "react-native-elements";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";

import { useNavigation } from "@react-navigation/native";

/*---------------------------------- FUNCTION ----------------------------------*/
function DoubleDeclaration({ category, avatar, firstName, isAsker, user }) {
  const navigation = useNavigation();

  const [overlayVisible, setOverlayVisible] = useState(true);
  // const [active, setActive] = useState(true);

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
  }.png`;

  return (
    // {isAsker ? (... il vous reste .. h  ) else ( félicitation! vous avez désormais ...h crédit) }

    <View style={styles.container}>
      <Overlay
        isVisible={overlayVisible}
        fullScreen
        overlayStyle={{ padding: 0 }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onPress={() => setOverlayVisible(true)}
        >
          <ImageBackground
            style={styles.ImageBackground}
            source={require("../../assets/images/background-2.png")}
            resizeMode="cover"
          >
            <View style={styles.containerOverlay}>
              <Text style={styles.textTitle2}>Merci!</Text>

              <Text style={styles.bodyText}>
                Nous avons bien pris en compte votre déclaration.
              </Text>

              <View style={styles.creditView}>
                <Image
                  style={styles.timeCounter}
                  source={require("../../assets/images/HomeScreen/timeCounter.png")}
                />
                {/* <Text
                  style={
                    (styles.boxTitle,
                    {
                      fontWeight: "700",
                      fontSize: 16,
                      fontFamily: "Poppins_500Medium",
                      // borderWidth: 4,
                      // borderColor: "green",
                    })
                  }
                >
                  Nouveau crédit temps:
                </Text> */}
                {/* <Text
                  style={
                    (styles.boxTitle,
                    { fontSize: 25, fontFamily: "Poppins_600SemiBold" })
                  }
                >
                  {user.user_credit ? user.user_credit : "1"}h
                </Text> */}
              </View>

              <Button
                title="Retour à l'accueil"
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Overlay>
      
{/* 
      <Overlay
        isVisible={overlayVisible}
        fullScreen
        overlayStyle={{ padding: 0 }}
      >
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../../assets/images/background-2.png")}
          resizeMode="cover"
        >
          <View style={styles.containerOverlay}>
            <View
              style={{
                alignItems: "flex-end",
                marginBottom: 20,
                paddingTop: 50,
              }}
            ></View>

            <Text style={styles.textTitle2}>Demande envoyée ! </Text>

            <Image
              style={styles.timeCounter}
              source={require("../../assets/images/HomeScreen/timeCounter.png")}
            />

            <Text style={styles.bodyText}>
              Les Swapers sélectionnés recevront une notification concernant
              votre demande.
            </Text>
            <Text style={styles.bodyText}> </Text>
            <Text style={styles.bodyText}>
              Votre demande sera consultable par d'autres Swapers qui ont les
              compétences requise. Ils pourront proposer de vous venir en aide.
            </Text>

            <Button
              title="Retour à l'accueil"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              onPress={() => 
                navigation.navigate("Home")               
              }
            />
          </View>
        </ImageBackground>
      </Overlay> */}

      <View style={styles.vignette1}>
        {/* ajouter Touchablewithoutfeedback pour afficher le profil du collaborateur*/}
        <View
          style={{
            flexDirection: "row",
            // borderWidth: 1,
            // borderColor: "blue",
          }}
        >
          <Avatar rounded size="medium" source={{ uri: avatar }} />
          <View style={{ marginLeft: 11 }}>
            <Text
              style={{ marginBottom: 2, fontFamily: "Poppins_600SemiBold" }}
            >
              {firstName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: 5,
              }}
            >
              <Image
                source={{ uri: path }}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              <View>
                <Text
                  style={{
                    maxWidth: 210,
                    maxHeight: 110,
                    fontSize: 13,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Demande de bricolage
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.declaration}>
          <View>
            <Text style={styles.titles}>Terminé</Text>
            <Text style={styles.data}>01/05/2022</Text>
          </View>
          <View>
            <Text style={styles.titles}>Durée</Text>
            <Text style={styles.data}>1h30</Text>
          </View>
        </View>
      </View>

      {/* COMMENTAIRE */}

      <View style={{ alignSelf: "flex-start" }}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            marginLeft: 35,
            fontSize: 15,
          }}
        >
          Commentaire
        </Text>
      </View>

      <View style={styles.vignette2}>
        <View style={styles.declaration}>
          <Text style={{ fontFamily: "Poppins_400Regular" }}>
            C'était super! C'était super! C'était super! C'était super! C'était
            super! C'était super! C'était super! C'était super! C'était super!
            C'était super! C'était super! C'était super!
          </Text>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps, null)(DoubleDeclaration);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  creditView: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 40,
    marginBottom: 180,
    borderColor: "red",
    borderWidth: 1,
  },
  timeCounter: {
    backgroundColor: "red",
    width: 120,
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    // borderColor: "red",
    // borderWidth: 1,
    
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 0,
  },
  view1: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: "100%",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 1,
    margin: 0,
  },
  vignette1: {
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
  vignette2: {
    maxHeight: "17%",
    paddingTop: 10,
    paddingBottom: 10,
    width: 330,
    fontSize: 13,
    margin: 15,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    justifyContent: "center",
  },
  pageTop: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 330,
    // borderWidth: 1,
    // borderColor: "red",
    marginTop: 70,
  },
  declaration: {
    flexDirection: "row",
    width: 180,
    justifyContent: "space-between",
  },
  titles: {
    marginTop: 25,
    marginLeft: 5,
    fontFamily: "Poppins_600SemiBold",
  },
  data: {
    marginBottom: 2,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
  },
  containerOverlay: {
    borderRadius: 20,
    height: "95%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "purple",
  },
  textTitle2: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    marginLeft: 10,
    marginTop: 70,
    marginBottom: 10,
    textAlign: "center",
    // borderWidth: 4,
    // borderColor: "blue",
  },
  bodyText: {
    color: "#717171",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: 50,
    // marginLeft: 10,
    // paddingHorizontal: 20,
    textAlign: "center",
    maxWidth: 300,
    // borderWidth: 4,
    // borderColor: "pink",
  },
  button: {
    color: "black",
    backgroundColor: "#F7CE46",
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 60,
    padding: 15,
  },
  buttonTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
