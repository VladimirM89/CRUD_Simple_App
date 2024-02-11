/* eslint-disable no-return-assign */
import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import {
  ID_IS_INVALID_TEXT,
  INTERNAL_SERVER_ERROR,
  USER_NOT_FOUND_TEXT,
} from "../constants/stringConstants";
import sendErrorMessage from "../utils/sendErrorMessage";
import { getIdFromPath } from "../utils/handlePath";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";
import USERS_DB from "../db/users";

function deleteUser(req: IncomingMessage, resp: ServerResponse) {
  try {
    let requestBody = "";

    const userId = getIdFromPath(req.url || "");

    if (validate(userId || "")) {
      req.on("data", (msg) => (requestBody += msg));

      req.on("end", () => {
        const deleteUserIndex = USERS_DB.findIndex((user) => user.id === userId);

        if (deleteUserIndex > -1) {
          USERS_DB.splice(deleteUserIndex, 1);

          resp.writeHead(RESPONSE_CODE.NO_CONTENT, TYPE_APPLICATION_JSON);
          resp.end();
        } else {
          sendErrorMessage(resp, RESPONSE_CODE.NOT_FOUND, USER_NOT_FOUND_TEXT);
        }
      });
    } else {
      sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, ID_IS_INVALID_TEXT);
    }
  } catch {
    sendErrorMessage(resp, RESPONSE_CODE.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
}

export default deleteUser;
