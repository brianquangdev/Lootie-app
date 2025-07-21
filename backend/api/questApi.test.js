// questApi.test.js - Unit test for questApi backend
// Technologies: Jest

const questApi = require("./questApi");

describe("questApi", () => {
  it("should create a quest (mock)", async () => {
    const res = await questApi.createQuest({ title: "Test Quest" });
    expect(res).toHaveProperty("success", true);
  });

  it("should complete a quest (mock)", async () => {
    const res = await questApi.completeQuest("1", "0x123");
    expect(res).toHaveProperty("success", true);
    expect(res).toHaveProperty("questId", "1");
    expect(res).toHaveProperty("userAddress", "0x123");
  });
});
