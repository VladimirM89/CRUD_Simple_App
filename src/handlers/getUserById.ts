import { ServerResponse } from "http";
import USERS_DB from "../db/users";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";
import { ErrorMessage } from "../models/ServerResponses";
import { USER_NOT_FOUND_TEXT } from "../constants/stringConstants";
import { getIdFromPath } from "../utils/handlePath";
import sendErrorMessage from "../utils/sendErrorMessage";

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
    sendErrorMessage(resp, RESPONSE_CODE.NOT_FOUND, USER_NOT_FOUND_TEXT);
  }
}

export default getUserById;
