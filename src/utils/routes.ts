import { IncomingMessage, ServerResponse } from "http";
import { METHOD } from "../constants/enums/serverEnums";
import addUser from "../handlers/addUser";
import deleteUser from "../handlers/deleteUser";
import getAllUsers from "../handlers/getAllUsers";
import getUserById from "../handlers/getUserById";
import updateUser from "../handlers/updateUser";

class Route {
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

const routes: Route[] = [
  new Route("/api/user", METHOD.GET, (_, resp: ServerResponse) => getAllUsers(resp)),

  new Route("/api/user/:id", METHOD.GET, (req: IncomingMessage, resp: ServerResponse) =>
    getUserById(resp, req.url!),
  ),

  new Route("/api/user", METHOD.POST, (req: IncomingMessage, resp: ServerResponse) =>
    addUser({ name: "Vladimir", age: 33, hobbies: [] }),
  ),

  new Route("/api/user/:id", METHOD.PUT, (req: IncomingMessage, resp: ServerResponse) =>
    updateUser("1", { age: 23, name: "Vova", hobbies: ["nodejs"] }),
  ),

  new Route("/api/user/:id", METHOD.DELETE, (req: IncomingMessage, resp: ServerResponse) =>
    deleteUser("1"),
  ),
];

export default routes;
