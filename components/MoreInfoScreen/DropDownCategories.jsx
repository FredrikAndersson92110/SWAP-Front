import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { connect } from "react-redux";

const data = [
  { label: "🚙 accompagnement trajet", value: "accompagnement trajet" },
  { label: "🧺 aide aux courses", value: "aide aux courses" },
  { label: "🛠 bricolage", value: "bricolage" },
  { label: "🪡 couture", value: "couture" },
  { label: "👨‍🍳 cuisine", value: "cuisine" },
  { label: "💃 danse", value: "danse" },
  { label: "👩‍💻 développement", value: "développement" },
  { label: "💾 informatique", value: "informatique" },
  { label: "🌿 jardinerie", value: "jardinerie" },
  { label: "🪑 montage de meubles", value: "montage de meubles" },
  { label: "🎼 musique", value: "musique" },
  { label: "🧘‍♀️ méditation", value: "méditation" },
  { label: "🧼 ménage", value: "ménage" },
  { label: "🎨 peinture", value: "peinture" },
  { label: "💧 plomberie", value: "plomberie" },
  { label: "🦮 promenade de chien", value: "promenade de chien" },
  { label: "🚲 réparation de vélo", value: "réparation de vélo" },
  { label: "📚 soutien scolaire", value: "soutien scolaire" },
  { label: "🏅 sport", value: "sport" },
  { label: "🧘‍♂️ yoga", value: "yoga" },
  { label: "⚡️ éléctricité", value: "éléctricité" },
  { label: "🇩🇪 allemand", value: "allemand" },
  { label: "🇬🇧 anglais", value: "anglais" },
  { label: "ش arabe", value: "arabe" },
  { label: "🇨🇳 chinois", value: "chinois" },
  { label: "🇰🇷 coréen", value: "coréen" },
  { label: "🇩🇰 dannois", value: "dannois" },
  { label: "🇪🇸 espagnole", value: "espagnole" },
  { label: "🇫🇮 finlandais", value: "finlandais" },
  { label: "🇫🇷français", value: "français" },
  { label: "🇮🇳 hindu", value: "hindu" },
  { label: "🇮🇱 hébreu", value: "hébreu" },
  { label: "🇮🇸 islandais", value: "islandais" },
  { label: "🇮🇹 italien", value: "italien" },
  { label: "🇯🇵 japonais", value: "japonais" },
  { label: "persan", value: "persan" },
  { label: "🇵🇱 polonais", value: "polonais" },
  { label: "🇵🇹 portugais", value: "portugais" },
  { label: "🇷🇺 russe", value: "russe" },
  { label: "🇸🇪 suédois", value: "suédois" },
  { label: "🇹🇿 swahili", value: "swahili" },
  { label: "🇹🇭 thaï", value: "thaï" },
  { label: "🇹🇷 turc", value: "turc" },
  { label: "🇻🇳 vietnamien", value: "vietnamien" },
];

const DropDownCategories = (props) => {
  const [selected, setSelected] = useState([]);
  let categoriesSelected = [];
  const handleCategories = () => {
    props.saveUserCategories(categoriesSelected);
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={props.style}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        dropdownPosition="auto"
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder={props.placeHolder}
        searchPlaceholder="Recherche..."
        value={selected}

        onChange={props.onChange}
        selectedStyle={styles.selectedStyle}
        containerStyle={props.containerStyle}
      />
    </View>
  );
};

// export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,

    // borderWidth: 2,
    // borderColor: "blue",
  },
  dropdown: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "100%",
    fontSize: 13,
    borderWidth: 2,
    paddingLeft: 15,
    borderRadius: 15,
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
    width: "70%",
    fontSize: 13,
    padding: 15,
    borderRadius: 15,
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
  placeholderStyle: {
    color: "grey",
    fontSize: 14,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserCategories: function (categories) {
      dispatch({ type: "saveUserCategories", categories });
    },
  };
}

export default connect(null, mapDispatchToProps)(DropDownCategories);
