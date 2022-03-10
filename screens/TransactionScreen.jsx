import { View, Text } from "react-native";
import { connect } from "react-redux";
import TransactionContainer from "../components/TransactionScreen/TransactionContainer";
import SkeletonContent from "react-native-skeleton-content";

    
function TransactionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TransactionContainer />
    </View>
  );
}

function mapStateToProps(state) {
  return { userDetails: state.userDetailsReducer };
}

export default connect(mapStateToProps, null)(TransactionScreen);
