const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("Returns correct key given numbered partitionKey", () => {
    const event = { data: "testing", partitionKey: 100 };
    expect(deterministicPartitionKey(event)).toBe(
      JSON.stringify(event.partitionKey)
    );
  });

  it("Returns correct key given string partitionKey", () => {
    const event = { data: "testing", partitionKey: "400" };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });

  it("Returns correct key given string long partitionKey", () => {
    const event = { data: "testing", partitionKey: "1".repeat(257) };
    const key = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(key);
  });

  it("Returns correct key for event with no partitionKey", () => {
    const event = { data: "testing" };
    const key = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(key);
  });
});
