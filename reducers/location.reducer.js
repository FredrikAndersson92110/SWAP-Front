export default function (location = {}, action) {
  console.log("COORDS", action.location);
  if (action.type === "user::location") return action.location;
  return location;
}
