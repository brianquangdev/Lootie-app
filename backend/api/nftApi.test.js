// nftApi.test.js - Unit test for nftApi backend
// Technologies: Jest

const nftApi = require("./nftApi");

describe("nftApi", () => {
  it("should mint an NFT (mock)", async () => {
    const res = await nftApi.mintNFT({ name: "Test NFT" });
    expect(res).toHaveProperty("success", true);
  });

  it("should list NFTs (mock)", async () => {
    const res = await nftApi.listNFTs("0x123");
    expect(Array.isArray(res)).toBe(true);
    expect(res[0]).toHaveProperty("owner", "0x123");
  });
});
