import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import  React, {useEffect} from "react";
import {
  Image,
  ImageBackground,
  ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View
} from "react-native";
import { connect } from "react-redux";
import Suggestions from "../components/HomeScreen/Suggestions";
import InputButton from "../components/InputButton";






const HomeScreen = ({ onSetLocation, user, navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status == "granted") {
          let location = await Location.watchPositionAsync(
            { distanceInterval: 10 },
            (location) => {
              onSetLocation(location);
            }
          );
        }
      })();
    }
  }, [isFocused]);

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-1.png")}
      resizeMode="cover"
    >
      <View style={(styles.container, { marginTop: 30 })}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={
            (styles.container,
            {
              width: "100%",
            })
          }
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* UserName */}
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 30,
              }}
            >
              <Feather
                name="user"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text
                style={styles.userName}
                onPress={() => {
                  navigation.navigate("UserScreen");
                }}
              >
                {user.firstName}
              </Text>
            </View>
          </View>

          {/* Credit Temps */}
          <View style={styles.container}>
            <Image
              style={styles.timeCounter}
              source={require("../assets/images/HomeScreen/timeCounter.png")}
            />
            <Text
              style={
                (styles.boxTitle,
                { fontSize: 25, fontFamily: "Poppins_600SemiBold" })
              }
            >
              {user.user_credit ? user.user_credit : "1"}h
            </Text>
            <Text
              style={
                (styles.boxTitle,
                {
                  fontWeight: "700",
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                })
              }
            >
              Crédit temps
            </Text>
          </View>

          {/* Ma recherche */}
          <View style={styles.searchBox}>
            <Text style={styles.boxTitle}>Ma recherche</Text>
            <InputButton
              style={{
                width: "100%",
                height: 42,
                backgroundColor: "white",
                paddingLeft: 13,
                textAlign: "left",
                backgroundColor: "white",
                borderRadius: 50,
                height: 40,
                color: "lightgrey",
                shadowColor: "#171717",
                shadowOffset: { width: 1, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 7,
                elevation: 6,
                borderBottomWidth: 0,
              }}
              placeHolder={"Trouver un service"}
            />
          </View>
          {/* MAP */}
          <View style={styles.mapBox}>
            <Text style={styles.boxTitle}>Mes missions à proximité</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("TinderScreen", {
                  screen: "TinderScreen",
                });
              }}
            >
              <Image
                style={styles.imageMap}
                source={require("../assets/images/HomeScreen/map.png")}
              />
            </TouchableWithoutFeedback>
            <Image
              source={{
                uri: user.user_img,
              }}
              style={{
                borderRadius: 50,
                height: 55,
                width: 55,
                position: "relative",
                left: "50%",
                marginLeft: -27,
                bottom: "64%",
              }}
            />
          </View>

          {/* Mes envies */}
          <View style={styles.suggestionsBox}>
            <Text style={styles.suggestionsTitle}>Mes envies</Text>
          </View>
          <Suggestions />
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return { user: state.userReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetLocation: function (location) {
      dispatch({ type: "user::location", location: location });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  box: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
  },
  searchBox: {
    width: "100%",
    height: 100,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    marginTop: 40,
  },
  mapBox: {
    width: "100%",
    height: 240,
    justifyContent: "flex-start",
    padding: 15,

    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  },
  suggestionsBox: {
    width: "100%",
    justifyContent: "flex-start",
    padding: 15,
    paddingBottom: 0,
    elevation: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boxTitle: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  userName: {
    fontWeight: "700",
    fontSize: 22,
    textAlign: "left",
    fontFamily: "Poppins_600SemiBold",
  },
  suggestionsTitle: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  image: {
    width: "100%",
    borderRadius: 15,
    resizeMode: "contain",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },
  imageMap: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    resizeMode: "contain",
  },
  timeCounter: {
    width: "40%",
    height: 120,
    resizeMode: "contain",
    position: "absolute",
  },
});
