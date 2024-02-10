import { ServerResponse } from "http";
import USERS_DB from "../users";
import { RESPONSE_CODE } from "../constants/enums/serverConstants";
import { TYPE_APPLICATION_JSON } from "../constants/environment";
import { ErrorMessage } from "../models/ServerResponses";
import { PROBLEM_WITH_DB_TEXT, USER_NOT_FOUND_TEXT } from "../constants/stringConstants";
import { getIdFromPath } from "../utils/handlePath";

function getUserById(resp: ServerResponse, path: string) {
  const id = getIdFromPath(path);
  try {
    const user = USERS_DB.find((user) => user.id === id);

    if (user) {
      resp.writeHead(RESPONSE_CODE.OK, TYPE_APPLICATION_JSON);
      resp.end(JSON.stringify(user));
    } else {
      resp.writeHead(RESPONSE_CODE.NOT_FOUND, TYPE_APPLICATION_JSON);
      const errorMessage: ErrorMessage = { message: USER_NOT_FOUND_TEXT };
      resp.end(JSON.stringify(errorMessage));
    }
  } catch {
    resp.writeHead(RESPONSE_CODE.INTERNAL_SERVER_ERROR, TYPE_APPLICATION_JSON);
    resp.end(PROBLEM_WITH_DB_TEXT);
  }
}

export default getUserById;
