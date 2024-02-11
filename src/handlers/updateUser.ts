/* eslint-disable no-return-assign */
import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import User from "../models/User";
import USERS_DB from "../db/users";
import { getIdFromPath } from "../utils/handlePath";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import {
  ID_IS_INVALID_TEXT,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_DATA_TEXT,
  USER_NOT_FOUND_TEXT,
} from "../constants/stringConstants";
import sendErrorMessage from "../utils/sendErrorMessage";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";
import { isDataTypeAccordingToUserInterface } from "../utils/checkBelongToInterface";

function updateUser(req: IncomingMessage, resp: ServerResponse) {
  try {
    let requestBody = "";

    const userId = getIdFromPath(req.url || "");

    if (!validate(userId || "")) {
      sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, ID_IS_INVALID_TEXT);
      return;
    }

    const user = USERS_DB.find((item) => item.id === userId);

    if (!user) {
      sendErrorMessage(resp, RESPONSE_CODE.NOT_FOUND, USER_NOT_FOUND_TEXT);
      return;
    }

    req.on("data", (msg) => (requestBody += msg));

    req.on("end", () => {
      const requestBodyObj: User = JSON.parse(requestBody);

      const user = USERS_DB.find((item) => item.id === userId);

      const result = { ...user, ...requestBodyObj };

      if (!isDataTypeAccordingToUserInterface(result)) {
        sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, INVALID_REQUEST_DATA_TEXT);
        return;
      }

      if (user) {
        resp.writeHead(RESPONSE_CODE.OK, TYPE_APPLICATION_JSON);
        resp.end(JSON.stringify(result));
      } else {
        sendErrorMessage(resp, RESPONSE_CODE.NOT_FOUND, USER_NOT_FOUND_TEXT);
      }
    });
  } catch {
    sendErrorMessage(resp, RESPONSE_CODE.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
}

export default updateUser;
