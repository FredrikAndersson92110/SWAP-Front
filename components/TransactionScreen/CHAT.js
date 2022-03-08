import { Feather } from "@expo/vector-icons";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";

const App = () => {
  let bottom = Platform.OS === "ios" ? 70 : 50;

  // ref
  const bottomSheetRef = useRef(BottomSheet);

  // variables
  const snapPoints = useMemo(() => ["30%", "50%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        onChange={handleSheetChanges}
        style={{
          alignItems: "center",
          marginTop: 60,
          justifyContent: "center",
        }}
      >
        <View style={styles.contentContainer}>
          <View style={{ width: "100%", marginLeft: 15, marginTop: 20 }}>
            <Text style={styles.titre}>Messages</Text>
          </View>

          <ScrollView content={styles.scrollZone}>
            {/* CHAT ZONE MESSAGES */}

            {/* Message received */}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.chatBubblesReceived}>
                <Text style={{ margin: 10, color: "white" }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message sent */}
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.chatBubblesSent}>
                <Text style={{ margin: 10 }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message received */}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.chatBubblesReceived}>
                <Text style={{ margin: 10, color: "white" }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message sent */}
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.chatBubblesSent}>
                <Text style={{ margin: 10 }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37
                  jours.Coucou! tu veux être mon ami? Je suis sobre depuis 37
                  jours. ☺️
                </Text>
              </View>
            </View>
            {/* Message received */}
            <View style={{ alignItems: "flex-start" }}>
              <View style={styles.chatBubblesReceived}>
                <Text style={{ margin: 10, color: "white" }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>

            {/* Message sent */}
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.chatBubblesSent}>
                <Text style={{ margin: 10 }}>
                  Coucou! tu veux être mon ami? Je suis sobre depuis 37 jours.
                  ☺️
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 370,
            alignItems: "center",
            marginBottom: bottom,
          }}
        >
          <BottomSheetTextInput
            style={[styles.input, { paddingBottom: 0 }]}
            keyboardBehavior={"fullScreen"}
            android_keyboardInputMode={"adjustResize"}
          />
          <TouchableOpacity
          // onPress={()=> {socket.emit("sendMessage", {message:currentMessage, pseudo: props.pseudo})}}
          >
            <View
              style={{
                backgroundColor: "#F7CE46",
                padding: 10,
                borderRadius: 50,
                margin: 20,
                shadowColor: "#171717",
                shadowOffset: { width: 1, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 7,
                elevation: 7,
              }}
            >
              <Feather name="send" size={18} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "lightgrey",
    width: "100%",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },
  contentContainer: {
    flex: 1,
    width: 370,
    alignItems: "center",
    marginTop: 0,
    // borderWidth: 2,
    // borderColor: "red",
  },
  input: {
    width: 300,
    height: 40,
    // marginBottom: { bottom },
    borderRadius: 20,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    paddingTop: 0,
    paddingLeft: 18,
    backgroundColor: "rgba(151, 151, 151, 0.15)",
  },
  chatBubblesSent: {
    maxWidth: 250,
    borderRadius: 15,
    backgroundColor: "#F7CE46",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
    marginLeft: 100,
    marginRight: 15,
  },
  send: {
    backgroundColor: "#F7CE46",
    position: "relative",
    bottom: 40,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  chatBubblesReceived: {
    maxWidth: 250,
    borderRadius: 15,
    backgroundColor: "black",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: "Poppins_400Regular",
    margin: 15,
    marginLeft: 15,
    marginRight: 100,
  },
  scrollZone: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    marginTop: 0,
    borderWidth: 2,
    borderColor: "red",
  },
  titre: {
    color: "#000000",
    fontSize: 18,
    marginBottom: 15,
    // lineHeight: 21,
    letterSpacing: 0.6,
    fontFamily: "Poppins_700Bold",
  },
});

export default App;
