import { Test, TestingModule } from "@nestjs/testing";
import { InProcessKeyValueStorageAdapter } from "../../services/in.process.key.value.storage.adapter";
import {
  KeyValueController,
  KEY_VALUE_STORAGE_SERVICE,
} from "./key.value.controller";

describe("keyValueController", () => {
  let keyValueController: KeyValueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KeyValueController],
      providers: [
        {
          provide: KEY_VALUE_STORAGE_SERVICE,
          useClass: InProcessKeyValueStorageAdapter,
        },
      ],
    }).compile();

    keyValueController = app.get<KeyValueController>(KeyValueController);
  });

  it("can save string value with a key", async () => {
    await keyValueController.set("key", { value: "value" });
    expect(keyValueController.get("key")).resolves.toBe("value");
  });

  it("return null for none existing key-value pairs", async () => {
    expect(keyValueController.get("non existing key")).resolves.toBeNull();
  });

  it("can delete all values", async () => {
    await keyValueController.set("key", { value: "value" });
    await keyValueController.set("key2", { value: "value2" });

    await keyValueController.deleteAll();

    expect(keyValueController.get("key")).resolves.toBeNull();
    expect(keyValueController.get("key2")).resolves.toBeNull();
  });
});
