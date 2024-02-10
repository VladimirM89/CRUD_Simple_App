import User from "../models/User";

function updateUser(id: string, data: Omit<User, "id">) {
  console.log("User ", id, "update: ", data);
}

export default updateUser;
