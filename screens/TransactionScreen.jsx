import { View, Text } from "react-native";
import { connect } from "react-redux";
function TransactionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>TransactionScreen</Text>
    </View>
  );
}

function mapStateToProps(state) {
  return { userDetails: state.userDetailsReducer };
}

export default connect(mapStateToProps, null)(TransactionScreen);
