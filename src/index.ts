import dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from "http";
import { DEFAULT_PORT } from "./constants/serverEnvironment";
import { RESPONSE_CODE } from "./constants/enums/serverEnums";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_ENDPOINT_TEXT,
  SERVER_START_MESSAGE,
} from "./constants/stringConstants";
import routes from "./utils/routes";
import sendErrorMessage from "./utils/sendErrorMessage";

dotenv.config();

const PORT = process.env.PORT || DEFAULT_PORT;

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  try {
    const route = routes.find((route) => route.isRouteExist(request));
    if (route) {
      route?.handler(request, response);
    } else {
      sendErrorMessage(response, RESPONSE_CODE.NOT_FOUND, INVALID_ENDPOINT_TEXT);
    }
  } catch {
    sendErrorMessage(response, RESPONSE_CODE.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
});

server.listen(PORT, () => console.log(`${SERVER_START_MESSAGE} ${PORT}`));
