import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { connect } from "react-redux";

const data = [
  { label: "Femme", value: "female" },
  { label: "Homme", value: "male" },
  { label: "Non Binaire", value: "non binary" },
];

const DropDownGender = (props) => {
  const [selected, setSelected] = useState([]);
  // console.log(selected);
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        dropdownPosition="auto"
        search={false}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={selected.label}
        value={selected}
        onChange={(item) => {
          setSelected(item);
          props.saveUserGender(item.value)
        }}
        selectedStyle={styles.selectedStyle}
        containerStyle={styles.dropContainer}
      />
    </View>
  );
};

// export default DropDownGender;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 2,
    // borderColor: "blue",
  },
  dropdown: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: Dimensions.get("window").width * 0.85,
    fontSize: 13,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    elevation: 3,
    maxHeight: 100,
  },
  dropContainer: {
    height: 20,
    width: "72%",
    fontSize: 13,
    borderRadius: 7,
    borderColor: "#E7E7E7",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    elevation: 3,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    fontFamily: "Poppins_500Medium",
  },

  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "white",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserGender: function (gender) {
      dispatch({ type: "saveUserGender", gender });
    },
  };
}

export default connect(null, mapDispatchToProps)(DropDownGender);