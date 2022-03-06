import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";


function Request({
  isAsker,
  currentRequest,
  onGetDetails,
  requestId,
  category,
  askerName,
  useravatar,
  location,
  categoryImage,
}) {
  const navigation = useNavigation();
  // const require = "../../assets/images/categories/bricolage.png"

  const handleDetails = () => {
    let user = "";
    onGetDetails(isAsker, currentRequest, requestId, user);
    navigation.navigate("DetailScreen");
  };

  // var path = `../../assets/images/categories/${category.replace(/\s/g, "_")}.png`
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Avatar
          rounded
          size="medium"
          source={{ uri: useravatar }}
          containerStyle={styles.avatar}
        />

        <View>
          <Text style={styles.cardTitle}>{askerName}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* {(category = category.replace(/\s/g, "_"))} */}
            {console.log(categoryImage)}
            <Image
              // source={require("../../assets/images/categories/bricolage.png")}
              source={categoryImage}
              style={{ width: 21, height: 21, marginRight: 10 }}
            />
            <Text style={styles.cardTitle}>
              {category.charAt(0).toUpperCase() + category.substring(1)}
            </Text>
          </View>
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
            <Text style={styles.bodyText}>{location} (6 km)</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleDetails}>
        <Text style={styles.buttonTitle}>Détails</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onGetDetails: function (isAsker, request, requestId, user) {
      dispatch({
        type: "user::details",
        isAsker: isAsker,
        request: request,
        requestId: requestId,
        user: user,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(Request);

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
    padding: 20,
    paddingBottom: 0,
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
