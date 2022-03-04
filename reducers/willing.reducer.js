export default function (willingUsers = [], action) {
  if (action.type === "user::willingusers") {
    return action.requests;
  } else {
    return willingUsers;
  }
}

// else if (action.type === "willingusers::refuse") {
//   console.log("reducer token", action.token);
//   let tempRequests = [...willingUsers];
//   let newRequests = [];
//   tempRequests.forEach((req) => {
//     let newUsers = req.willing_users.filter(
//       (user) => user.token !== action.token
//     );
//     req.willing_users = newUsers;
//     newRequests.push(req);
//   });
//   console.log("newRequests", newRequests);
//   return newRequests;
// }
