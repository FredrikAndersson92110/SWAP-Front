import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";

import { useIsFocused, useNavigation } from "@react-navigation/native";

function Request({
  isAsker,
  name,
  useravatar,
  category,
  currentRequest,
  onGetDetails,
  location,
  requestId,
  request,
  distance,
}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleDetails = () => {
    onGetDetails(isAsker, currentRequest, requestId, request, distance);
    navigation.navigate("DetailScreen");
  };

  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          paddingLeft: 20,
          marginBottom: 10,
          fontFamily: "Poppins_600SemiBold",
        }}
      >
        Demande de cours de {category}
      </Text>

      {/* CARD */}
      <View style={styles.card}>
        <View style={{ flexDirection: "row", width: "100%", padding: 7 }}>
          <Avatar
            rounded
            size="medium"
            source={{ uri: useravatar }}
            containerStyle={styles.avatar}
          />
          <View>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.bodyText}>Propose des cours de {category}</Text>

            {/* CITY */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={16}
                color="#F7CE46"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.bodyText}>
                {location.length > 10
                  ? location.substring(0, 10) + "..."
                  : location}{" "}
                ({distance} km)
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDetails}>
          <Text style={styles.text}>Détails</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return { userLocation: state.locationReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetDetails: function (isAsker, request, requestId, user, distance) {
      dispatch({
        type: "user::details",
        isAsker: isAsker,
        request: request,
        location: distance,
        requestId: requestId,
        user: user,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: "85%",
    height: 35,
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 8,

    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 10,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    letterSpacing: 0.6,
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
    paddingBottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 6,
    marginHorizontal: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginLeft: 0,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Poppins_500Medium",
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  avatar: {
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    paddingLeft: 13,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 15,
    color: "lightgrey",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderBottomWidth: 0,
    width: "95%",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  newRequest: {
    fontSize: 16,
    marginLeft: 20,
    fontFamily: "Poppins_600SemiBold",
  },
});
