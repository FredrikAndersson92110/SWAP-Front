import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Input } from "react-native-elements";
import { connect } from "react-redux";

const InputBirthDate = (props) => {

  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);
  let date = null;
  let regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  const handleSubmit = () => {
  if (date.length >= 10) {
    if (!date.match(regex)) {
      console.log("mauvaise date");
      setError("Merci d'entrer une date au format JJ/MM/AAAA ");
    } else {
      props.saveUserBirthDate(date);
      setError(null)
    }
  }
  };


  return (
    <View >
      <Input
        containerStyle={styles.input}
        inputStyle={{ fontSize: 13 }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        secureTextEntry={false}
        placeholder="JJ/MM/AAAA"
        onChangeText={(text) => {
          setSelected(text);
          date = text;
          console.log(date);
          handleSubmit();
        }}
      />
      <View style={{ alignItems: "flex-start", width: "100%" }}>
        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
};

// export default InputBirthDate;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    // borderWidth: 2,
    // borderColor: "blue",
  },
  input: {
    height: 40,
    width: Dimensions.get("window").width * 0.85,
    fontSize: 13,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginTop: 15
  },
  error: {
    position: "absolute",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    paddingLeft: 15,
    color: "red",
  },
});


function mapDispatchToProps(dispatch) {
  return {
    saveUserBirthDate: function (birth_date) {
      dispatch({ type: "saveUserBirthDate", birth_date });
    },
  };
}

export default connect(null, mapDispatchToProps)(InputBirthDate);