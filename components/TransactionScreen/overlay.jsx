{
  /*  */
}
<View style={styles.container2}>
  <BottomSheet
    ref={bottomSheetRef}
    index={1}
    snapPoints={snapPoints}
    onChange={handleSheetChanges}
  >
    <View style={styles.contentContainer}>
      <Text>Awesome 🎉</Text>
    </View>
  </BottomSheet>
</View>;
{
  /*  */
}

// OVERLAY ELISA

{
  /* TERNAIRE OVERLAY */
}
{
  active ? (
    <Overlay
      backdropStyle={{ opacity: 0 }}
      isVisible={true}
      fullscreen
      overlayStyle={styles.overlayFull}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            marginLeft: 15,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Messages
        </Text>
        <TouchableOpacity onPress={() => setActive(false)}>
          <AntDesign
            name="close"
            size={30}
            color="#000000"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollZone}>
        <View style={{ alignItems: "flex-end" }}>
          {/* CHAT ZONE MESSAGES */}

          {/* à dynamiser: {chatMessages} */}
          <ListItem>
            <Text style={styles.chatBubbles}>
              Coucou! tu veux être mon ami?
              bhjghfjhfhfvhfvjhfvhfhfvkfhkhfjhfhfvhfvjhfvhfhfvkfj;
              LAZJQDMEHFLRSHGLFJBQFJCBj:fsbq:bjsdfjq:wbHLGJLBjhlv
            </Text>
          </ListItem>
        </View>
      </ScrollView>

      {/* INPUT et BOUTON D'ENVOI */}
      <View style={{ flexDirection: "row", marginTop: 18 }}>
        <Input
          containerStyle={styles.input}
          inputStyle={{
            fontSize: 13,
            fontFamily: "Poppins_400Regular",
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="Messages"
          onChangeText={(msg) => setCurrentMessage(msg)}
          value={currentMessage}
        />
        <View style={styles.send}>
          <TouchableWithoutFeedback
          // onPress={()=> {socket.emit("sendMessage", {message:currentMessage, pseudo: props.pseudo})}}
          >
            <Feather name="send" size={18} color="#000000" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Overlay>
  ) : (
    <Pressable style={styles.fakeoverlay1}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onPress={() => setActive(true)}
      >
        {/* une fois dynamisé: {chatMessages} */}

        <View>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 17,
              marginLeft: 15,
              marginTop: 10,
            }}
          >
            Messages
          </Text>

          {/* CHAT ZONE MESSAGES - SMALL OVERLAY */}
          <ScrollView style={styles.smallScrollZone}>
            <View style={{ alignItems: "flex-end" }}>
              <ListItem style={{ borderRadius: 8 }}>
                <Text style={styles.chatBubbles}>Coucou!</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.chatBubbles}>
                  Merci pour d'avoir accepté ma demande :. Tu serais disponible
                  quand?
                </Text>
              </ListItem>
              {/* une fois dynamisé: {chatMessages} */}
            </View>
          </ScrollView>
        </View>

        {/* INPUT et BOUTON D'ENVOI - SMALL OVERLAY */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <Input
            containerStyle={styles.input}
            inputStyle={{
              fontSize: 13,
              fontFamily: "Poppins_400Regular",
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Messages"
            onPressIn={() => setActive(true)}
          />
          <View style={styles.send}>
            <Feather name="send" size={18} color="#000000" />
          </View>
        </View>
      </TouchableOpacity>
    </Pressable>
  );
}
