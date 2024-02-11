/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import server from "../index";

describe("CRUD methods", () => {
  const user = {
    username: "test",
    age: 22,
    hobbies: ["node.js"],
  };

  let id = "";
  const notExistingId = "0569e085-e9aa-41e5-b788-f4da02fd4228";
  const fakeId = "0569e085-e3af111-41e5-b788-f4da02fd4228";

  afterEach(() => server.close());

  describe("GET method", () => {
    it("should return mistake while invalid endpoint", async () => {
      const res = await request(server).get("/api/test").send();
      expect(res.statusCode).toEqual(404);
      expect(res.body).toStrictEqual({ message: "Invalid address" });
    });

    it("should return initial empty array", async () => {
      const res = await request(server).get("/api/users").send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual([]);
    });

    it("should create new user", async () => {
      const res = await request(server).post("/api/users").send(user);
      id = res.body.id as string;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toStrictEqual({ ...user, id: expect.any(String) });
    });

    it("should return user by id", async () => {
      const res = await request(server).get(`/api/users/${id}`).send(id);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual({ ...user, id });
    });

    it("should return error message when no such user", async () => {
      const res = await request(server).get(`/api/users/${notExistingId}`).send(notExistingId);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toStrictEqual({ message: "User not found" });
    });

    it("should return error message when id in invalid format (get Method)", async () => {
      const res = await request(server).get(`/api/users/${fakeId}`).send(fakeId);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toStrictEqual({ message: "Invalid format ID" });
    });
  });

  describe("POST method", () => {
    it("should create new user", async () => {
      const res = await request(server).post("/api/users").send(user);
      id = res.body.id as string;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toStrictEqual({ ...user, id: expect.any(String) });
    });
  });

  describe("PUT method", () => {
    it("should put existing user", async () => {
      const res = await request(server)
        .put(`/api/users/${id}`)
        .send({
          username: "New test",
          hobbies: ["frontend"],
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual({ username: "New test", age: 22, hobbies: ["frontend"], id });
    });
  });
});
