import { ServerResponse } from "http";
import { RESPONSE_CODE } from "../constants/enums/serverEnums";
import { ErrorMessage } from "../models/ServerResponses";
import { TYPE_APPLICATION_JSON } from "../constants/serverEnvironment";

function sendErrorMessage(resp: ServerResponse, respCode: RESPONSE_CODE, message: string) {
  resp.writeHead(respCode, TYPE_APPLICATION_JSON);
  const errorMessage: ErrorMessage = { message };
  resp.end(JSON.stringify(errorMessage));
}

export default sendErrorMessage;
