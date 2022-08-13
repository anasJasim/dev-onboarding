import { KeyValueStorageService } from "src/application/key.value.storage.service";
import { RedisKeyValueStorageAdapter } from "./redis.key.value.storage.adapter";

describe("Redis Key Value Storage Adapter", () => {
  let storage: RedisKeyValueStorageAdapter;
  beforeEach(async () => {
    if (storage) {
      await storage.deleteAll();
    }
    process.env.REDIS_DB_HOST = "0.0.0.0";
    storage = new RedisKeyValueStorageAdapter();
  });
  it("can set a string value associated with a key", async () => {
    await storage.set("key", "value");
    expect(storage.get("key")).resolves.toBe("value");
  });
  it("can set an object value associated with a key", async () => {
    const value = { key1: "value1" };
    await storage.set("key", value);
    expect(storage.get("key")).resolves.toBe(JSON.stringify(value));
  });
  it("can set a number value associated with a key", async () => {
    const value = 123456;
    await storage.set("key", value);
    expect(storage.get("key")).resolves.toBe(value.toString());
  });
  it("return null for none existing key-value pairs", async () => {
    expect(storage.get("none")).resolves.toBeNull();
  });
  it("can delete all values", async () => {
    await storage.set("key1", "value1");
    await storage.set("key2", "value2");

    await storage.deleteAll();

    expect(storage.get("key1")).resolves.toBeNull();
    expect(storage.get("key2")).resolves.toBeNull();
  });
});
