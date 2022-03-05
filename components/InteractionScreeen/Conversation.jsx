import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ListItem, Avatar, Text } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

/* -----------------------------FUNCTION---------------------------------------*/
function Conversation({
  name,
  useravatar,
  category,
  lastMessage,
  request,
  isAsker,
}) {
  const navigation = useNavigation();

var openTransaction = () => {
  navigation.navigate('TransactionScreen')
  console.log(request, isAsker)
}

  return (
    <>
      <TouchableWithoutFeedback>
        <ListItem
          onPress={() => openTransaction()}
          Component={TouchableOpacity}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          style={{ width: "100%" }}
          disabledStyle={{ opacity: 0.5 }}
          pad={20}
        >
          <Avatar
            rounded
            size="medium"
            source={{ uri: useravatar }}
            avatarStyle={{
              borderWidth: 3,
              borderColor: isAsker ? "#F7CE46" : "#253a78",
            }}
          />
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.boxText}>{name}</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "#8B8B8B" }}>{isAsker ? "Demande:" : "Mission:"} </Text>
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  {category}
                </Text>
              </View>
            </View>
            <Text
              style={{ color: "#8B8B8B", fontFamily: "Poppins_400Regular" }}
            >
              {lastMessage.message}
            </Text>
          </View>
        </ListItem>
      </TouchableWithoutFeedback>
      <View
        style={{
          borderBottomColor: "#8B8B8B",
          opacity: 0.5,
          borderBottomWidth: 0.5,
          width: "70%",
        }}
      />
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getRequestInfos: function (request, isAsker) {
      dispatch({ type: "getRequestInfos", request, isAsker });
    },
  };
}

export default connect(null, mapDispatchToProps)(Conversation);


//
// ─────────────────────────────────────────────────── ──────────
//   :::::: S T Y L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  boxTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 30,
  },
  boxText: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  box: {
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },
});
