import { ServerResponse } from "http";
import USERS_DB from "../users";
import { RESPONSE_CODE } from "../constants/enums/serverConstants";
import { TYPE_APPLICATION_JSON } from "../constants/environment";
import { PROBLEM_WITH_DB_TEXT } from "../constants/stringConstants";

function getAllUsers(resp: ServerResponse) {
  try {
    resp.writeHead(RESPONSE_CODE.OK, TYPE_APPLICATION_JSON);
    resp.end(JSON.stringify(USERS_DB));
  } catch {
    resp.writeHead(RESPONSE_CODE.INTERNAL_SERVER_ERROR, TYPE_APPLICATION_JSON);
    resp.end(PROBLEM_WITH_DB_TEXT);
  }
}

export default getAllUsers;
