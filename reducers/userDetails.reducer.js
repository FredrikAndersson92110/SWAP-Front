export default function (userDetails = {}, action) {
  let data = {
    isAsker: action.isAsker,
    request: action.request,
    location: action.location,
    requestId: action.requestId,
    user: action.user,
  };
  if (action.type === "user::details") return data;
  return userDetails;
}
