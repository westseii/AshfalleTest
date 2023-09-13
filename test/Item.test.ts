import { describe, expect, test } from "vitest";

import { Item, ItemCategory } from "../src/inventory/item/Item.js";

type ItemConstructor = typeof Item;
type ItemOptions = ConstructorParameters<ItemConstructor>[0];

function createItem(itemOptions?: ItemOptions): Item {
  return new Item(itemOptions);
}

describe("Item default values", () => {
  const itemWithDefaults = createItem();

  test("Item with defaults", () => {
    expect(itemWithDefaults.name).toBe("Unnamed Item");
    expect(itemWithDefaults.category).toBe("General");
    expect(itemWithDefaults.burden).toBe(0.1);
    expect(itemWithDefaults.value).toBe(1);
    expect(itemWithDefaults.maxQuantity).toBe(1);
    expect(itemWithDefaults.quantity).toBe(1);
  });
});

describe("Item property constraints", () => {
  const negativeItem = createItem({
    burden: -10,
    value: -100,
    maxQuantity: -5,
    quantity: -2,
  });

  test("Item with negative burden", () => {
    expect(negativeItem.burden).toBe(0);
  });

  test("Item with negative value", () => {
    expect(negativeItem.value).toBe(0);
  });

  test("Item with negative maxQuantity", () => {
    expect(negativeItem.maxQuantity).toBe(1);
  });

  test("Item with negative quantity", () => {
    expect(negativeItem.quantity).toBe(1);
  });
});

describe("Item custom configurations", () => {
  const itemOptions = {
    name: "Focusing Stone",
    category: ItemCategory.EQUIPABLE,

    burden: 100,
    value: 1001,

    maxQuantity: 5,
    quantity: 10,
  };
  const itemWithOptions = createItem(itemOptions);
  const itemWithOptions2 = createItem({
    name: "Copper Talisman",
    category: ItemCategory.REAGENT,
    burden: 99,
    value: 999,
    maxQuantity: 10,
    quantity: 15,
  });

  test("Item with options", () => {
    expect(itemWithOptions.name).toBe("Focusing Stone");
    expect(itemWithOptions.category).toBe("Equipable");
    expect(itemWithOptions.burden).toBe(100);
    expect(itemWithOptions.value).toBe(1_001);
    expect(itemWithOptions.maxQuantity).toBe(5);
    expect(itemWithOptions.quantity).toBe(5);
  });

  test("Item with options 2", () => {
    expect(itemWithOptions2.name).toBe("Copper Talisman");
    expect(itemWithOptions2.category).toBe("Reagent");
    expect(itemWithOptions2.burden).toBe(99);
    expect(itemWithOptions2.value).toBe(999);
    expect(itemWithOptions2.maxQuantity).toBe(10);
    expect(itemWithOptions2.quantity).toBe(10);
  });
});

describe("Item value and quantity calculations", () => {
  const item4 = createItem();
  const item5 = createItem({
    value: 19_283,

    maxQuantity: 13,
    quantity: 13,
  });

  test("Item unit value", () => {
    item4.value = 99;
    expect(item4.getValueArray().join(".")).toBe("0.0.99");
    item4.value = 100;
    expect(item4.getValueArray().join(".")).toBe("0.1.0");
    item4.value = 101;
    expect(item4.getValueArray().join(".")).toBe("0.1.1");

    item4.value = 9_999;
    expect(item4.getValueArray().join(".")).toBe("0.99.99");
    item4.value = 10_000;
    expect(item4.getValueArray().join(".")).toBe("1.0.0");
    item4.value = 10_001;
    expect(item4.getValueArray().join(".")).toBe("1.0.1");

    item4.value = 999_999;
    expect(item4.getValueArray().join(".")).toBe("99.99.99");
    item4.value = 1_000_000;
    expect(item4.getValueArray().join(".")).toBe("100.0.0");
    item4.value = 1_000_001;
    expect(item4.getValueArray().join(".")).toBe("100.0.1");

    item4.value = 123_456;
    expect(item4.getValueArray().join(".")).toBe("12.34.56");
  });

  test("Item quantity value", () => {
    expect(item5.getValueArray().join(".")).toBe("1.92.83");
    // 19283 * 13 = 250679
    expect(item5.getValueQuantityArray().join(".")).toBe("25.6.79");
    // 19283 * 8 = 154264
    item5.quantity = 8;
    expect(item5.getValueQuantityArray().join(".")).toBe("15.42.64");
    // 19283 * 3 = 57849
    item5.quantity = 3;
    expect(item5.getValueQuantityArray().join(".")).toBe("5.78.49");
  });
});

// TODO: tests for display(), toString(), and toConsole()
