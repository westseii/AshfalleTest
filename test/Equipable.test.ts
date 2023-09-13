import { describe, expect, test } from "vitest";

import { Equipable, EquipSlot } from "../src/inventory/item/Equipable.js";

describe("Equipable", () => {
  test("initializes with default values", () => {
    const equipable = new Equipable();

    expect(equipable.equipSlot).toBe(EquipSlot.ONE_HANDED);
    expect(equipable.isArtistryItem).toBe(true);
    expect(equipable.artistry).toBe(3);
    expect(equipable.level).toBe(1);
  });

  test("initializes with provided values", () => {
    const equipable = new Equipable({
      equipSlot: EquipSlot.HEAD,
      isArtistryItem: false,
      artistry: 2,
      level: 3,
    });

    expect(equipable.equipSlot).toBe(EquipSlot.HEAD);
    expect(equipable.isArtistryItem).toBe(false);
    expect(equipable.artistry).toBe(null); // as artistry should be null when isArtistryItem is false
    expect(equipable.level).toBe(3);
  });

  test("artistry value is controlled between 1 and 5", () => {
    const equipable = new Equipable();

    equipable.artistry = 7;
    expect(equipable.artistry).toBe(5);

    equipable.artistry = 0;
    expect(equipable.artistry).toBe(1);

    equipable.artistry = 3;
    expect(equipable.artistry).toBe(3);
  });

  test("level value is controlled to be minimum 1", () => {
    const equipable = new Equipable();

    equipable.level = -2;
    expect(equipable.level).toBe(1);

    equipable.level = 0;
    expect(equipable.level).toBe(1);

    equipable.level = 4;
    expect(equipable.level).toBe(4);
  });
});
