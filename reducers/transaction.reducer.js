export default function (transactionInfos = {}, action) {
    if (action.type === "getTransactionInfos") {
      // console.log(">>>> REDUCER getTransactionInfos :", action.transactionInfos.conversationInfos, action.transactionInfos.isAsker);
      
      return action.transactionInfos ;
    }
    return transactionInfos
  }

