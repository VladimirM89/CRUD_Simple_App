/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../models/User";

export function isBelongToUserInterface(obj: any): obj is User {
  return "username" in obj && "age" in obj && "hobbies" in obj;
}

export function isDataTypeAccordingToUserInterface(obj: any): obj is User {
  return (
    typeof obj.username === "string" &&
    typeof obj.age === "number" &&
    Array.isArray(obj.hobbies) &&
    (obj.hobbies.every((item: unknown) => typeof item === "string") || obj.hobbies.length === 0)
  );
}
