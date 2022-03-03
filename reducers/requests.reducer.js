export default function (requests = [], action) {
  if (action.type === "user::requests") return action.requests;
  return requests;
}
