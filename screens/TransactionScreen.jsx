import { View, Text } from "react-native";
import TransactionContainer from "../components/TransactionScreen/TransactionContainer";

export default function TransactionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TransactionContainer />
    </View>
  );
}