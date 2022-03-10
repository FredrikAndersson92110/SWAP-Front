export default function (selectedUsers = [], action) {
  if (action.type === "selected::user")
    return [...selectedUsers, action.userId];
  else if (action.type === "deselected::selected") {
    let newArray = [...selectedUsers].filter(
      (userId) => userId !== action.userId
    );
    return newArray;
  } else if (action.type === "reset::selected") return [];
  return selectedUsers;
}
