import { ServerResponse } from "http";
import { validate } from "uuid";
import USERS_DB from "../db/users";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";
import {
  ID_IS_INVALID_TEXT,
  INTERNAL_SERVER_ERROR,
  USER_NOT_FOUND_TEXT,
} from "../constants/stringConstants";
import { getIdFromPath } from "../utils/handlePath";
import sendErrorMessage from "../utils/sendErrorMessage";

function getUserById(resp: ServerResponse, path: string) {
  const id = getIdFromPath(path);
  const isIdValid = validate(id || "");
  try {
    if (isIdValid) {
      const user = USERS_DB.find((user) => user.id === id);

      if (user) {
        resp.writeHead(RESPONSE_CODE.OK, TYPE_APPLICATION_JSON);
        resp.end(JSON.stringify(user));
      } else {
        sendErrorMessage(resp, RESPONSE_CODE.NOT_FOUND, USER_NOT_FOUND_TEXT);
      }
    } else {
      sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, ID_IS_INVALID_TEXT);
    }
  } catch {
    sendErrorMessage(resp, RESPONSE_CODE.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
}

export default getUserById;
