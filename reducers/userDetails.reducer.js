export default function (userDetails = {}, action) {
  console.log("REDUCER", action.user);
  let data = {
    isAsker: action.isAsker,
    request: action.request,
    location: action.location,
    requestId: action.requestId,
    user: action.user,
  };
  if (action.type === "user::details") return data;
  else if (action.type === "request::userdetails") return action.user;
  return userDetails;
}
