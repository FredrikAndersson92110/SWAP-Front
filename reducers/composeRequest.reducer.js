export default function (request = {}, action) {

  if (action.type === "composeRequest::newRequest") {
    let request = action.newRequest;

    console.log("REDUCER composeRequest, added to store :", request);
    return request;
  }
  return request;
}
