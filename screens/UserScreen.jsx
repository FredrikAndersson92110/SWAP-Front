import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Input } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Outils pour dynamiser le compteur
// import AnimateNumber from "react-native-animate-number";
import { connect } from "react-redux";
import DropDownCategories from "../components/MoreInfoScreen/DropDownCategories";

const UserScreen = (props) => {
  const navigation = useNavigation();

  const [adress1, setAdress1] = useState();
  const [adress2, setAdress2] = useState();
  const [cp1, setCp1] = useState();
  const [cp2, setCp2] = useState();
  const [city1, setCity1] = useState();
  const [city2, setCity2] = useState();
  const [comp1, setComp1] = useState();
  const [comp2, setComp2] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isModif, setIsModif] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  let handleSubmit = async () => {
    let response = await fetch(
      `https://swapapp-backend.herokuapp.com/users/updateAdress/${props.user.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `address_street_1=${adress1}&address_city=${city1}&address_zipcode=${cp1}`,
        // body: JSON.stringify({ address_street_1:adress1,address_zipcode:cp1 })
      }
    );

    let jresponse = await response.json();
    console.log(adress1);
    console.log(cp1);
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log(e);
      // clear error
    }

    console.log("Token removed from local storage (userScreen File)");
    navigation.navigate("SignInScreen");
  };

  const updateState = () => {
    setIsEditable(!isEditable);
    setIsModif("Informations à compléter");
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/background-1.png")}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* UserName and Avatar*/}
          <View style={styles.container3}>
            <Avatar
              size={64}
              rounded
              source={{
                uri: props.user.user_img,
              }}
              title="KIM CHI"
              containerStyle={{ backgroundColor: "grey" }}
            >
              <Avatar.Accessory size={23} />
            </Avatar>
            <Text style={styles.boxTitle}>{props.user.firstName}</Text>

            <Text
              style={{
                position: "absolute",
                right: 40,
                fontFamily: "Poppins_600SemiBold",
                fontSize: 14,
              }}
              onPress={() => logOut()}
            >
              Deconnexion
            </Text>
          </View>

          {/* Credit Temps */}
          <View style={styles.container2}>
            <Image
              style={styles.timeCounter}
              source={require("../assets/images/HomeScreen/timeCounter.png")}
            />
            <View style={styles.absolute}>
              {/* <AnimateNumber
                value={props.user.user_credit}
                countBy={1}
                timing={(interval, progress) => {
                  // slow start, slow end
                  return interval * (1 - Math.sin(Math.PI * progress)) * 50;
                }}
              /> */}

              <Text style={styles.title3}>{props.user.user_credit}H</Text>
              <Text style={{ fontSize: 14, fontFamily: "Poppins_500Medium" }}>
                Crédit temps
              </Text>
            </View>
          </View>

          {/* Informations User */}
          <View style={styles.card}>
            <View style={styles.container4}>
              <Text style={styles.title}>
                Mes infos
                <TouchableWithoutFeedback
                  onPress={() => {
                    updateState();
                    handleSubmit();
                  }}
                >
                  <FontAwesome name="gear" size={30} color="#F7CE46" />
                </TouchableWithoutFeedback>
              </Text>
            </View>

            <View style={styles.container4}>
              <Text style={styles.title2}>
                {" "}
                {props.user.firstName} , {props.user.age}
              </Text>
            </View>

            <View style={styles.container4}>
              <Text style={styles.title2}>Adresse principale </Text>
              <Text style={styles.title2}>{isModif}</Text>
              <Input
                containerStyle={styles.input2}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={props.user.userAddresses[0].address_street_1}
                onChangeText={(text) => setAdress1(text)}
                editable={isEditable}
              />
              <Input
                containerStyle={styles.input2}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={props.user.userAddresses[0].address_city}
                onChangeText={(text) => setCity1(text)}
                editable={isEditable}
              />
              <Input
                containerStyle={styles.input2}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={props.user.userAddresses[0].address_zipcode}
                onChangeText={(text) => setCp1(text)}
                editable={isEditable}
              />
            </View>

            <View style={styles.container4}>
              <Text style={styles.title2}>Adresse secondaire </Text>
              <Input
                containerStyle={styles.input2}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={props.user.userAddresses[1].address_street_1}
                onChangeText={(text) => setAdress2(text)}
                editable={isEditable}
              />
              <Input
                containerStyle={styles.input2}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={props.user.userAddresses[1].address_city}
                onChangeText={(text) => setCity2(text)}
                editable={isEditable}
              />
              <Input
                containerStyle={styles.input2}
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={props.user.userAddresses[1].address_zipcode}
                onChangeText={(text) => setCp2(text)}
                editable={isEditable}
              />
            </View>

            <View style={styles.container4}>
              <Text style={styles.title}>
                Mes compétences{" "}
                <TouchableWithoutFeedback
                  onPress={() => {
                    updateState();
                  }}
                >
                  <FontAwesome name="gear" size={30} color="#F7CE46" />
                </TouchableWithoutFeedback>
              </Text>

              <DropDownCategories
                placeHolder={"Choisissez une catégorie"}
                containerStyle={[
                  styles.card,
                  {
                    height: 100,
                    marginBottom: 200,
                    width: "77%",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  },
                ]}
                style={{
                  width: "100%",
                  padding: 15,

                  shadowColor: "#171717",
                  shadowOffset: { width: 1, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 7,
                  borderRadius: 15,
                  elevation: 6,
                  marginHorizontal: 15,
                  paddingHorizontal: 30,
                }}
                onChange={(item) => {
                  setSelectedCat();
                  setSelectedCat(item);

                  console.log("selectedCat", selectedCat);
                  // handleCategories();
                }}
              />
              <DropDownCategories
                placeHolder={"Choisissez une catégorie"}
                containerStyle={[
                  styles.card,
                  {
                    height: 100,
                    marginBottom: 200,
                    width: "77%",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  },
                ]}
                style={{
                  width: "100%",
                  padding: 15,

                  shadowColor: "#171717",
                  shadowOffset: { width: 1, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 7,
                  borderRadius: 15,
                  elevation: 6,
                  marginHorizontal: 15,
                  paddingHorizontal: 30,
                }}
                onChange={(item) => {
                  setSelectedCat();
                  setSelectedCat(item);

                  console.log("selectedCat", selectedCat);
                  // handleCategories();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
  },

  container2: {
    width: "100%",
    height: "100%",
    flex: 1,
    marginBottom: 30,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  container3: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 25,
  },
  container4: {
    width: "90%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    borderRadius: 15,
    flexDirection: "column",
    backgroundColor: "white",
    marginBottom: 0,
    justifyContent: "center",
    paddingVertical: 5,
  },
  card: {
    width: "90%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    borderRadius: 15,
    flexDirection: "column",
    backgroundColor: "white",
    marginBottom: 0,
    justifyContent: "center",
    paddingVertical: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },
  boxTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    textAlign: "left",
    marginLeft: 20,
  },
  box: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    padding: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginBottom: 40,
  },
  image: {
    width: "90%",
    borderRadius: 15,
    resizeMode: "contain",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },

  input: {
    padding: 10,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  input2: {
    padding: 0,
    textAlign: "left",
    // backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 30,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  fonts: {
    marginBottom: 8,
  },

  timeCounter: {
    width: "38%",
    height: 130,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 4,
    fontSize: 18,
    marginLeft: 30,
    justifyContent: "center",
  },
  title2: {
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 4,
    fontSize: 14,
    marginLeft: 30,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    marginVertical: 4,
    fontSize: 16,
    marginLeft: 30,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title3: {
    marginVertical: 4,
    fontSize: 25,
    fontFamily: "Poppins_600SemiBold",
  },
});

function mapStateToProps(state) {
  return { user: state.userReducer, request: state.newRequest };
}

export default connect(mapStateToProps, null)(UserScreen);
