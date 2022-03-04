export default function (user = {}, action) {
  if (action.type === "saveUser") {
    console.log("USER REDUCER ==>", action.user);
    return action.user;
  } else if (action.type === "saveUserBirthDate") {
    console.log("bdate", action.birth_date);
    let userCopy = user;
    userCopy.birth_date = action.birth_date;
    console.log("userCopy", userCopy);
    return userCopy;
  } else if (action.type === "saveUserGender") {
    console.log("saveUserGender ==>", action.saveUserGender);
    let userCopy = user;
    userCopy.gender = action.gender;
    console.log("userCopy ==>", userCopy);
    return userCopy;
  } else if (action.type === "saveUserCategories") {
    // console.log("saveUserCategories ==>", action.saveUserCategories);
    let userCopy = user;
    userCopy.categories = action.categories[0];
    console.log("REDUCER CATEGORIES ==>", userCopy);
    return userCopy;
  } else {
    return user;
  }
}
