import gameSettings from "../settings/gameSettings.json" assert { type: "json" };

import { createArmor, createJewelry, createWeapon } from "../loot/artistry/artistryFactory.js";
import { getRandomElement, getRandomIntInclusive } from "../utilities/utilities.js";
import { ItemType } from "../types/items.js";
import { LootOptions, AppliedLootOptions } from "../types/options.js";

/**
 * The `equipment` object contains nested objects for different categories of equipment,
 * such as `armor`, `jewelry`, and `weapon`. Each category contains methods for different
 * types of equipment within that category, which return a function that generates the equipment
 * item when invoked with loot options.
 *
 * @example
 * // To generate a cloth armor item:
 * const clothArmor = equipment.armor.cloth(lootOptions);
 *
 * @property {Object} armor - The `armor` object contains methods for generating different types of armor.
 * Each property returns a function that takes loot options and generates an armor item.
 * @property {Object} jewelry - The `jewelry` object contains methods for generating different types of jewelry.
 * Each property returns a function that takes loot options and generates a jewelry item.
 * @property {Object} weapon - The `weapon` object contains methods for generating different types of weapons.
 * Each property returns a function that takes loot options and generates a weapon item.
 */
const equipment = {
  armor: {
    cloth: _generate("armor", "cloth"),
    leather: _generate("armor", "leather"),
    mail: _generate("armor", "mail"),
    plate: _generate("armor", "plate"),
    shield: _generate("armor", "shield"),
  },
  jewelry: {
    necklace: _generate("jewelry", "necklace"),
    ring: _generate("jewelry", "ring"),
  },
  weapon: {
    axe: _generate("weapon", "axe"),
    axe2H: _generate("weapon", "axe2H"),
    caster: _generate("weapon", "caster"),
    caster2H: _generate("weapon", "caster2H"),
    mace: _generate("weapon", "mace"),
    mace2H: _generate("weapon", "mace2H"),
    missile: _generate("weapon", "missile"),
    sword: _generate("weapon", "sword"),
    sword2H: _generate("weapon", "sword2H"),
  },
};

/**
 * Applies provided loot options, defaults to game settings if not provided.
 * Generates artistry and level based on the provided options.
 *
 * @param {LootOptions} lootOptions - The loot options to be applied.
 * @returns {AppliedLootOptions} The resulting applied loot options including generated artistry and level.
 */
function _applyLootOptions(lootOptions: LootOptions): AppliedLootOptions {
  // override default lootOptions with user-specified lootOptions
  const { artistryRange, levelRange } = { ...gameSettings.lootOptions, ...lootOptions };

  // set default maximum value for levelGenerateRange if it is null
  const maxLevel = levelRange.max === null ? gameSettings.game.maxPlayerLevel : levelRange.max;

  // generate artistry and level
  const artistry = getRandomIntInclusive(artistryRange.min, artistryRange.max);
  const level = getRandomIntInclusive(levelRange.min, maxLevel);

  // validated loot options
  return {
    artistry,
    level,
  };
}

/**
 * Generates a function that creates a piece of equipment of a given type and subtype
 * when called with loot options.
 *
 * @param {ItemType} type - The type of the item to generate.
 * @param {string} subtype - The subtype of the item to generate.
 * @returns {(lootOptions: LootOptions) => Item} A function that generates an item when called with loot options.
 */
function _generate(type: ItemType, subtype: string): any {
  return (lootOptions: LootOptions = gameSettings.lootOptions) => {
    const { artistry, level } = _applyLootOptions(lootOptions);

    // Use generator
    const generator: Record<ItemType, () => any> = {
      armor: () => createArmor(subtype, artistry, level),
      jewelry: () => createJewelry(subtype, artistry, level),
      weapon: () => createWeapon(subtype, artistry, level),
    };

    const item = generator[type]();

    return item;
  };
}

const itemTypes = Object.keys(equipment);

const armorSubtypes = Object.keys(equipment.armor);
const jewelrySubtypes = Object.keys(equipment.jewelry);
const weaponSubtypes = Object.keys(equipment.weapon);

/**
 * Generates a piece of equipment with random type and subtype, or specified type and subtype in loot options.
 * The generated item's attributes are based on the loot options, which default to the game settings.
 *
 * @param {LootOptions} lootOptions - The options for generating the piece of equipment.
 * If `itemType` is specified in the options, the item will be of that type. Otherwise, the type is random.
 * @returns {any} The generated piece of equipment.
 * @throws Will throw an error if an unsupported itemType is provided.
 */
function randomEquipment(lootOptions: LootOptions = gameSettings.lootOptions): any {
  const itemType = lootOptions.itemType || (getRandomElement(itemTypes) as keyof typeof equipment);

  switch (itemType) {
    case "armor":
      const armorSubtype = getRandomElement(armorSubtypes) as keyof typeof equipment.armor;
      return equipment.armor[armorSubtype](lootOptions);
    case "jewelry":
      const jewelrySubtype = getRandomElement(jewelrySubtypes) as keyof typeof equipment.jewelry;
      return equipment.jewelry[jewelrySubtype](lootOptions);
    case "weapon":
      const weaponSubtype = getRandomElement(weaponSubtypes) as keyof typeof equipment.weapon;
      return equipment.weapon[weaponSubtype](lootOptions);

    default:
      throw new Error(`Unsupported itemType: ${itemType}`);
  }
}

export { equipment, randomEquipment };
