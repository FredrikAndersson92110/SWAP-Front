// interactionscreen

export default function (willingUsers = [], action) {
  if (action.type === "user::willingusers") {
    return action.requests;
  } else {
    return willingUsers;
  }
}
