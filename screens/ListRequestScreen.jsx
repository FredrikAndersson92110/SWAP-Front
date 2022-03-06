import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import {
  Button,
  Text,
  Input,
  CheckBox,
  Icon,
  Overlay,
} from "react-native-elements";
import {
  Entypo,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Conversation from "../components/InteractionScreeen/Conversation";
import { connect } from "react-redux";

import RNPickerSelect from "react-native-picker-select";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ListRequestScreen(props) {
  const [check4, setCheck4] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-2.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View
            style={{
              alignItems: "flex-end",
              marginBottom: 20,
              paddingTop: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AskScreen", {
                  screen: "AskScreen",
                });
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* card */}

          <Input
            placeholder="Trouver un service"
            inputContainerStyle={styles.input}
            containerStyle={{
              paddingHorizontal: 0,
              marginTop: 0,
            }}
            leftIcon={
              <Entypo name="magnifying-glass" size={24} color="#F7CE46" />
            }
            placeholderTextColor={{ color: "blue" }}
          />

          <View style={styles.card}>
            <RNPickerSelect
              style={styles.input}
              placeholder={{
                label: "Selectionnez votre position",
                value: null,
              }}
              onValueChange={(value) => console.log(value)}
              items={[
                {
                  label: "Position actuelle",
                  value: "Position actuelle",
                  inputLabel: "ici!",
                },
                {
                  label: "Adresse principale",
                  value: "Adresse principale",
                },
              ]}
            />
          </View>

          <Text style={styles.bodyText}>
            Choisissez au moins 2 swapers à qui envoyer votre demander. D'autres
            swapers pourront également vous proposer leur aide une fois votre
            demande d'aide publiée.{" "}
          </Text>

          <Text style={styles.textTitle}>Les profils qui correspondent</Text>

          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                left
                checkedIcon={
                  <Ionicons name="checkbox-outline" size={35} color="#F7CE46" />
                }
                uncheckedIcon={
                  <Ionicons name="square-outline" size={35} color="#F7CE46" />
                }
                checked={check1}
                onPress={() => setCheck1(!check1)}
              />

              <View>
                <Text style={styles.cardTitle}>Elisa</Text>
                <Text style={styles.bodyText2}>
                  Propose des cours de chinois
                </Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("UserRequestScreen", {
                    screen: "UserRequestScreen",
                  });
                }}
              >
                <Image
                  source={require("../assets/avatar.png")}
                  style={styles.avatar}
                ></Image>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                left
                checkedIcon={
                  <Ionicons name="checkbox-outline" size={35} color="#F7CE46" />
                }
                uncheckedIcon={
                  <Ionicons name="square-outline" size={35} color="#F7CE46" />
                }
                checked={check2}
                onPress={() => setCheck2(!check2)}
              />

              <View>
                <Text style={styles.cardTitle}>Théo</Text>
                <Text style={styles.bodyText2}>
                  Propose des cours de chinois
                </Text>
              </View>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              ></Image>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                left
                checkedIcon={
                  <Ionicons name="checkbox-outline" size={35} color="#F7CE46" />
                }
                uncheckedIcon={
                  <Ionicons name="square-outline" size={35} color="#F7CE46" />
                }
                checked={check4}
                onPress={() => setCheck4(!check4)}
              />

              <View>
                <Text style={styles.cardTitle}>Théo</Text>
                <Text style={styles.bodyText2}>
                  Propose des cours de chinois
                </Text>
              </View>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              ></Image>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                left
                checkedIcon={
                  <Ionicons name="checkbox-outline" size={35} color="#F7CE46" />
                }
                uncheckedIcon={
                  <Ionicons name="square-outline" size={35} color="#F7CE46" />
                }
                checked={check3}
                onPress={() => setCheck3(!check3)}
              />

              <View>
                <Text style={styles.cardTitle}>Théo</Text>
                <Text style={styles.bodyText2}>
                  Propose des cours de chinois
                </Text>
              </View>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              ></Image>
            </View>
          </View>

          <Button
            title="Valider"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => toggleOverlay()}
          />

          <Overlay isVisible={overlayVisible} fullScreen>
            <ImageBackground
              style={styles.ImageBackground}
              source={require("../assets/images/background-2.png")}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <KeyboardAwareScrollView>
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginBottom: 20,
                      paddingTop: 50,
                    }}
                  ></View>

                  <Text style={styles.textTitle2}>Demande envoyée ! </Text>

                  <View style={styles.container2}>
                    <AntDesign name="checkcircle" size={100} color="#F7CE46" />
                  </View>

                  <Text style={styles.bodyText}>
                    Les Swapers sélectionnés recevront une notification
                    concernant votre demande.
                  </Text>
                  <Text style={styles.bodyText}> </Text>
                  <Text style={styles.bodyText}>
                    Votre demande sera consultable par d'autres Swapers qui ont
                    les compétences requise. Ils pourront proposer de vous venir
                    en aide.
                  </Text>

                  <Button
                    title="Retour à l'accueil"
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                      props.navigation.navigate("Home");
                      toggleOverlay()
                    }}

                  />
                </KeyboardAwareScrollView>
              </View>
            </ImageBackground>
          </Overlay>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onAddRequests: function (data) {
      dispatch({ type: "user::requests", requests: data });
    },
  };
}

function mapStateToProps(state) {
  return { requests: state.requestsReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRequestScreen);

//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
  },
  container2: {
    flex: 1,

    // borderRadius: 70,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
    marginBottom: 140,
  },
  containerCheckBox: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
  },
  input: {
    paddingLeft: 20,
    marginHorizontal: 6,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  inputTextarea: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 15,
    marginHorizontal: 6,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  textTitle2: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
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
  card: {
    paddingLeft: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    elevation: 6,
    marginHorizontal: 6,
    paddingBottom: 20,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 10,
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
  bodyText2: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
  },
  icon: {
    marginRight: 10,
  },
});
