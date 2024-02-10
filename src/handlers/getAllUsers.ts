import { ServerResponse } from "http";
import USERS_DB from "../db/users";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";
import { PROBLEM_WITH_DB_TEXT } from "../constants/stringConstants";
import sendErrorMessage from "../utils/sendErrorMessage";

function getAllUsers(resp: ServerResponse) {
  try {
    resp.writeHead(RESPONSE_CODE.OK, TYPE_APPLICATION_JSON);
    resp.end(JSON.stringify(USERS_DB));
  } catch {
    sendErrorMessage(resp, RESPONSE_CODE.INTERNAL_SERVER_ERROR, PROBLEM_WITH_DB_TEXT);
  }
}

export default getAllUsers;
