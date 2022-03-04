export default function (userDetails = {}, action) {
  let data = {
    isAsker: action.isAsker,
    request: action.request,
    requestId: action.requestId,
  };
  if (action.type === "user::details") return data;
  return userDetails;
}
