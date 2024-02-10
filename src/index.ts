import dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from "http";
import { DEFAULT_PORT, TYPE_APPLICATION_JSON } from "./constants/environment";
import { Endpoints, METHOD, RESPONSE_CODE } from "./constants/enums/serverConstants";
import getAllUsers from "./handlers/getAllUsers";
import getUserById from "./handlers/getUserById";
import addUser from "./handlers/addUser";
import updateUser from "./handlers/updateUser";
import deleteUser from "./handlers/deleteUser";
import { ErrorMessage } from "./models/ServerResponses";
import { INTERNAL_SERVER_ERROR, SERVER_START_MESSAGE } from "./constants/stringConstants";
import { checkIsPathIdentical } from "./utils/handlePath";

dotenv.config();

const PORT = process.env.PORT || DEFAULT_PORT;

export default class Router {
  public path: string;

  public method: keyof typeof METHOD;

  public handler: (req: IncomingMessage, res: ServerResponse) => void;

  constructor(
    path: string,
    method: keyof typeof METHOD,
    handler: (req: IncomingMessage, res: ServerResponse) => void,
  ) {
    this.path = path;
    this.method = method;
    this.handler = handler;
  }
}

const routes: Router[] = [
  new Router("/api/user", METHOD.GET, (_, resp: ServerResponse) => getAllUsers(resp)),

  new Router("/api/user/:id", METHOD.GET, (req: IncomingMessage, resp: ServerResponse) =>
    getUserById(resp, req.url!),
  ),

  new Router("/api/user", METHOD.POST, (req: IncomingMessage, resp: ServerResponse) =>
    addUser({ name: "Vladimir", age: 33, hobbies: [] }),
  ),

  new Router("/api/user/:id", METHOD.PUT, (req: IncomingMessage, resp: ServerResponse) =>
    updateUser("1", { age: 23, name: "Vova", hobbies: ["nodejs"] }),
  ),

  new Router("/api/user/:id", METHOD.DELETE, (req: IncomingMessage, resp: ServerResponse) =>
    deleteUser("1"),
  ),
];

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  try {
    if (request.url?.includes(Endpoints.API_USERS)) {
      const route = routes.find(
        (route) =>
          route.method === request.method && checkIsPathIdentical([route.path, request.url || ""]),
      );
      console.log(route);
      route?.handler(request, response);
    } else {
      response.writeHead(RESPONSE_CODE.NOT_FOUND);
      response.end("No such page");
    }
  } catch {
    response.writeHead(RESPONSE_CODE.INTERNAL_SERVER_ERROR, TYPE_APPLICATION_JSON);
    const errorMessage: ErrorMessage = { message: INTERNAL_SERVER_ERROR };
    response.end(JSON.stringify(errorMessage));
  }
});

server.listen(PORT, () => console.log(`${SERVER_START_MESSAGE} ${PORT}`));
