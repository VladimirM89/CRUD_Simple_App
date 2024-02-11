import { IncomingMessage, ServerResponse } from "http";
import { Endpoints, METHOD } from "../constants/enums/serverEnums";
import addUser from "../handlers/addUser";
import deleteUser from "../handlers/deleteUser";
import getAllUsers from "../handlers/getAllUsers";
import getUserById from "../handlers/getUserById";
import updateUser from "../handlers/updateUser";
import { pathNormalize } from "./handlePath";
import { PATH_SEPARATOR } from "../constants/stringConstants";

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

  isRouteExist(req: IncomingMessage) {
    const normalizedPath = pathNormalize(req.url || "");
    if (this.path.includes(":id")) {
      const pathWithoutId = this.path.split(PATH_SEPARATOR).slice(0, -1).join(PATH_SEPARATOR);
      const requestUrlWithoutId = normalizedPath
        .split(PATH_SEPARATOR)
        .slice(0, -1)
        .join(PATH_SEPARATOR);
      return pathWithoutId === requestUrlWithoutId && this.method === req.method;
    }
    return this.method === req.method && this.path === normalizedPath;
  }
}

const routes: Route[] = [
  new Route(Endpoints.USERS, METHOD.GET, (_, resp: ServerResponse) => getAllUsers(resp)),

  new Route(Endpoints.USER_ID, METHOD.GET, (req: IncomingMessage, resp: ServerResponse) =>
    getUserById(resp, pathNormalize(req.url!)),
  ),

  new Route(Endpoints.USERS, METHOD.POST, (req: IncomingMessage, resp: ServerResponse) =>
    addUser({ name: "Vladimir", age: 33, hobbies: [] }),
  ),

  new Route(Endpoints.USER_ID, METHOD.PUT, (req: IncomingMessage, resp: ServerResponse) =>
    updateUser("1", { age: 23, name: "Vova", hobbies: ["nodejs"] }),
  ),

  new Route(Endpoints.USER_ID, METHOD.DELETE, (req: IncomingMessage, resp: ServerResponse) =>
    deleteUser("1"),
  ),
];

export default routes;
