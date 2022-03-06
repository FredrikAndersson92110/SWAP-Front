export default function (categoryMatches = [], action) {
  if (action.type === "user::categoryMatches") return action.matches;
  return categoryMatches;
}
