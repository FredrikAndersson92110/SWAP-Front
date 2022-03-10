import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { CheckBox, Text, Avatar } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

function Card({
  firstName,
  category,
  avatar,
  onSelectedUser,
  onPickUser,
  onDeselect,
  selectedUser,
  selectedUsers,
}) {
  const navigation = useNavigation();

  const [check, setCheck] = useState(false);

  if (selectedUsers == []) {
    setCheck(false);
  }
  const handleUserDetails = () => {
    onSelectedUser(selectedUser);
    navigation.navigate("UserRequestScreen", {
      screen: "UserRequestScreen",
    });
  };

  const handleCheck = () => {
    setCheck(!check);
    if (!check) {
      onPickUser(selectedUser._id);
    } else {
      onDeselect(selectedUser._id);
    }
  };

  return (
    <View style={styles.card}>
      <CheckBox
        containerStyle={{ margin: 0, padding: 0, marginLeft: 10 }}
        left
        checkedIcon={
          <Ionicons name="checkbox-outline" size={35} color="#F7CE46" />
        }
        uncheckedIcon={
          <Ionicons name="square-outline" size={35} color="#F7CE46" />
        }
        checked={check}
        onPress={handleCheck}
      />

      <View>
        <Text style={styles.cardTitle}>{firstName}</Text>
        <Text style={styles.bodyText2}>Propose: {category}</Text>
      </View>
      <TouchableWithoutFeedback onPress={handleUserDetails}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: avatar,
          }}
          containerStyle={{ marginRight: 10 }}
        />
      </TouchableWithoutFeedback>
      {/* </View> */}
    </View>
  );
}

function mapStateToProps(state) {
  return { selectedUsers: state.selectedReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectedUser: function (user) {
      dispatch({ type: "request::userdetails", user: user });
    },
    onPickUser: function (userId) {
      dispatch({ type: "selected::user", userId: userId });
    },
    onDeselect: function (userId) {
      dispatch({ type: "deselected::user", userId: userId });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
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
    marginLeft: 20,
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    elevation: 6,
    marginHorizontal: 13,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  bodyText: {
    color: "#717171",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginLeft: 25,
    paddingHorizontal: 20,
    marginRight: 25,
  },
  bodyText2: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
  },
  icon: {
    marginRight: 10,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
