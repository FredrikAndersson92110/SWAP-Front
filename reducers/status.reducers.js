export default function (status = 0, action) {
    if (action.type === "userStatus") {
      console.log("reducer !!!", action.status);
      return action.status;
    }
    return status
  }