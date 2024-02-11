import { IncomingMessage, ServerResponse } from "http";

function deleteUser(req: IncomingMessage, resp: ServerResponse) {
  console.log("User delete");
}

export default deleteUser;
