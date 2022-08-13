import { KeyValueStorageService } from "src/application/key.value.storage.service";
import { InProcessKeyValueStorageAdapter } from "./in.process.key.value.storage.adapter";
describe("In Process Key Value Storage adapter", () => {
  let storage: KeyValueStorageService;

  beforeEach(async () => {
    if (storage) await storage.deleteAll();
    storage = new InProcessKeyValueStorageAdapter();
  });

  it("can save string value with a key", async () => {
    await storage.set("key", "value");
    expect(storage.get("key")).resolves.toBe("value");
  });

  it("return null for none existing key-value pairs", async () => {
    expect(storage.get("none")).resolves.toBeNull();
  });

  it("can delete all values", async () => {
    await storage.set("key", "value");
    await storage.set("key2", "value2");

    await storage.deleteAll();

    expect(storage.get("key")).resolves.toBeNull();
    expect(storage.get("key2")).resolves.toBeNull();
  });
});
