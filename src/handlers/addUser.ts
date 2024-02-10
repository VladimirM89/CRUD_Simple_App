import User from "../models/User";

function addUser(data: Omit<User, "id">) {
  console.log("User: ", data);
}

export default addUser;
