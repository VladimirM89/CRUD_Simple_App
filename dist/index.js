"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const test_1 = __importDefault(require("./test"));
dotenv_1.default.config();
console.log("Server port: ", process.env.PORT);
(0, test_1.default)();
//# sourceMappingURL=index.js.map
