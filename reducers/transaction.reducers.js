export default function (request = [], action) {
    if (action.type === "userStatus") {
      console.log("reducer !!!", action.status);
      return action.status;
    }
    return status
  }