import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

import { connect } from "react-redux";

function DetailScreen({ userDetails, navigation, onAddRequestWillingUsers }) {
  const handleAccept = async () => {
    if (userDetails.isAsker) {
      let request = await fetch(
        `http://192.168.10.108:3000/accept-helper/${userDetails.requestId}/${userDetails.request.token}`,
        {
          method: "PUT",
        }
      );
    }
    navigation.navigate("TransactionScreen");
  };

  const handleRefuse = async () => {
    if (userDetails.isAsker) {
      let request = await fetch(
        `https://swapapp-backend.herokuapp.com/delete-willing-user/${userDetails.requestId}/${userDetails.request.token}`,
        {
          method: "DELETE",
        }
      );
      await request.json();
      navigation.goBack();
    } else {
      console.log("not asker");
    }
  };

  let data;
  if (userDetails.isAsker) {
    data = userDetails.user;
  } else {
    data = userDetails.request.asker;
  }

  console.log("DATA", data);
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
                <Avatar rounded size="large" source={{ uri: data.user_img }} />
                <View style={{ marginLeft: 20, justifyContent: "center" }}>
                  <Text style={{ fontSize: 22, fontFamily: "Poppins_700Bold" }}>
                    {data.firstName}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="verified"
                      size={14}
                      color={data.verified_profile ? "#F7CE46" : "#8B8B8B"}
                    />
                    <Text style={{ marginLeft: 5 }}>
                      {data.verified_profile ? "Profil verifie" : ""}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {/* divider */}
            <View style={styles.divider} />
            {/* Content */}
            {data.categories.map((category, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={require("../assets/images/categories/bricolage.png")}
                    style={{ width: 21, height: 21, marginRight: 10 }}
                  />
                  <Text style={styles.cardTitle}>
                    {category.sub_category
                      ? category.sub_category.charAt(0).toUpperCase() +
                        category.sub_category.substring(1)
                      : category.category}
                  </Text>
                </View>
              );
            })}
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
              <Text style={styles.bodyText}>
                5Km ({data.userAddresses[0].address_city})
              </Text>
            </View>

            <View>
              <Text style={styles.textStyle}>Infos</Text>
              <Text style={styles.bodyText}>{data.description}</Text>
            </View>

            <View>
              <Text style={styles.textStyle}>Disponibilites</Text>
              <Text style={styles.bodyText}>{data.disponibility}</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleAccept}>
            <Text style={styles.buttonTitle}>Accepter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBlack} onPress={handleRefuse}>
            <Text style={styles.buttonTitleBlack}>Refuser</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onAddRequestWillingUsers: function (token) {
      dispatch({
        type: "willingusers::refuse",
        token: token,
      });
    },
  };
}

function mapStateToProps(state) {
  return { userDetails: state.userDetailsReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);

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
