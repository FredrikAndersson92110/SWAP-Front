import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-elements";

import { connect } from "react-redux";

function UserRequestScreen({ userDetails, navigation }) {
  console.log(userDetails);
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
              navigation.navigate("ListRequestScreen", {
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
                <Avatar
                  rounded
                  size="large"
                  source={{
                    uri: userDetails.user_img,
                  }}
                />
                <View style={{ marginLeft: 20, justifyContent: "center" }}>
                  <Text style={{ fontSize: 22, fontFamily: "Poppins_700Bold" }}>
                    {userDetails.firstName}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="verified"
                      size={14}
                      color={
                        userDetails.verified_profile ? "#F7CE46" : "#8B8B8B"
                      }
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      {userDetails.verified_profile ? "Profil vérifié" : null}
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

              {userDetails.categories.map((category, i) => {
                console.log("category", category);
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
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: path }}
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

              {userDetails.comments.length > 0 ? (
                userDetails.comments.map((comment, i) => {
                  return (
                    <View key={i}>
                      <Text style={styles.comments}>{comment.author}</Text>
                      <Text style={styles.bodyText}>{comment.content}</Text>
                    </View>
                  );
                })
              ) : (
                <View>
                  <Text style={styles.bodyText}>
                    {userDetails.firstName} n'a pas encore de commentaires
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

function mapStateToProps(state) {
  return { userDetails: state.userDetailsReducer };
}

export default connect(mapStateToProps, null)(UserRequestScreen);

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
