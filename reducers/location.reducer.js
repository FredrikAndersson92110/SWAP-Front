export default function (location = {}, action) {
  if (action.type === "user::location") return action.location;
  return location;
}
