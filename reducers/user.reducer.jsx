export default function (user = null, action) {
  if (action.type === "saveUser") {
    console.log("reducer !!!", action.user);
    return action.user;
  }
  return user
}
