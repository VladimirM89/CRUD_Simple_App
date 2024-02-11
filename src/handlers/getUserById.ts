import { ServerResponse } from "http";
import USERS_DB from "../db/users";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";
import { INTERNAL_SERVER_ERROR, USER_NOT_FOUND_TEXT } from "../constants/stringConstants";
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
      sendErrorMessage(resp, RESPONSE_CODE.NOT_FOUND, USER_NOT_FOUND_TEXT);
    }
  } catch {
    sendErrorMessage(resp, RESPONSE_CODE.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
}

export default getUserById;
