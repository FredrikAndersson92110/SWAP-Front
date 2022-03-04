
//
// ─── YELLOW BUTTONS ─────────────────────────────────────────────────────────────
//

<TouchableOpacity
  style={styles.button}
  onPress={() => {
    props.navigation.navigate("DetailScreen", {
      screen: "DetailScreen",
    });
  }}
>
  <Text style={styles.text}>Détails</Text>
</TouchableOpacity>;

//styles :
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: "85%",
    height: 35,
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
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    // fontFamily: "Poppins"
  },
});

