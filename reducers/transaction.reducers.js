export default function (transactionInfos = {}, action) {
  console.log("REDUCER >>>", action.transactionInfos.conversationInfos);
  if (action.type === "getTransactionInfos") {
    // console.log(">>>> REDUCER getTransactionInfos :", action.transactionInfos.conversationInfos, action.transactionInfos.isAsker);

    return action.transactionInfos;
  }
  return transactionInfos;
}
