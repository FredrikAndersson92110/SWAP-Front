// requests corresondants a mes categories depuis fetch dans HelpScreen
export default function (categoryMatches = [], action) {
  if (action.type === "user::categoryMatches") {

    return action.matches;
  } else if (action.type === "user::removeMatch") {
    let tempMatches = [...categoryMatches];
    let newMatches = tempMatches.filter(
      (match) => match._id !== action.requestId
    );
    return newMatches;
  }
  return categoryMatches;
}
