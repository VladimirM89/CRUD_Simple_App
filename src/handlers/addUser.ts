/* eslint-disable no-return-assign */
import { v4 as uuidv4 } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import {
  isBelongToUserInterface,
  isDataTypeAccordingToUserInterface,
} from "../utils/checkBelongToInterface";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import sendErrorMessage from "../utils/sendErrorMessage";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_DATA_TEXT,
  REQUIRED_KEY_IN_REQUEST_DATA_TEXT,
  USER_EXIST_TEXT,
} from "../constants/stringConstants";
import USERS_DB from "../db/users";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";

async function addUser(req: IncomingMessage, resp: ServerResponse) {
  const id = uuidv4();
  let requestBody = "";

  try {
    req.on("data", (msg) => (requestBody += msg));

    req.on("end", () => {
      const requestBodyObj = JSON.parse(requestBody);
      if (isBelongToUserInterface(requestBodyObj)) {
        if (isDataTypeAccordingToUserInterface(requestBodyObj)) {
          requestBodyObj.id = id;
          const existedUser = USERS_DB.find((user) => user.id === id);
          if (!existedUser) {
            USERS_DB.push(requestBodyObj);
            resp.writeHead(RESPONSE_CODE.CREATED, TYPE_APPLICATION_JSON);
            resp.end(JSON.stringify(requestBodyObj));
          } else {
            sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, USER_EXIST_TEXT);
          }
        } else {
          sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, INVALID_REQUEST_DATA_TEXT);
        }
      } else {
        sendErrorMessage(resp, RESPONSE_CODE.BAD_REQUEST, REQUIRED_KEY_IN_REQUEST_DATA_TEXT);
      }
    });
  } catch {
    sendErrorMessage(resp, RESPONSE_CODE.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
}

export default addUser;
