import { EquipSlot, Equipable } from "../../inventory/item/Equipable.js";
import { getRandomElement, getRandomIntInclusive } from "../../utilities/utilities.js";

const possibleArmorSlots = Object.values({
  CHEST: EquipSlot.CHEST,
  FEET: EquipSlot.FEET,
  HANDS: EquipSlot.HANDS,
  HEAD: EquipSlot.HEAD,
  LEGS: EquipSlot.LEGS,
});

const subtypesArmor = ["cloth", "leather", "mail", "plate", "shield"];
const subtypes1H = ["axe", "caster", "mace", "sword"];
const subtypes2H = ["axe2H", "caster2H", "mace2H", "missile", "sword2H"];

//
// equip slot getters

function _getArmorEquipSlot(subtype: string): string {
  if (!subtypesArmor.includes(subtype)) {
    throw new Error(`Invalid subtype ${subtype} for armor.`);
  }

  if (subtype === "shield") {
    return EquipSlot.ONE_HANDED;
  }

  return getRandomElement(possibleArmorSlots);
}

function _getJewelryEquipSlot(subtype: string): string {
  if (subtype === "necklace") {
    return EquipSlot.NECK;
  }
  if (subtype === "ring") {
    return EquipSlot.FINGER;
  }

  throw new Error(`Invalid subtype ${subtype} for jewelry.`);
}

function _getWeaponEquipSlot(subtype: string): string {
  if (subtypes1H.includes(subtype)) {
    return EquipSlot.ONE_HANDED;
  }
  if (subtypes2H.includes(subtype)) {
    return EquipSlot.TWO_HANDED;
  }

  throw new Error(`Invalid subtype ${subtype} for weapon.`);
}

//
// other

function _getBaseMaterial() {
  // ...
}
// TODO: function (_getBaseMaterial()) to select random base material (e.g. copper,silver,gold, etc.)
// TODO: certain materials will be more rare than other materials

function _placeholderValueCalc(artistry: number, level: number): number {
  return artistry * level * getRandomIntInclusive(3, 33); // TODO: more sophisticated value generation, using _getBaseMaterial()
}

//
// create types

function createArmor(subtype: string, artistry: number, level: number): Equipable {
  const equipSlot = _getArmorEquipSlot(subtype);
  const value = _placeholderValueCalc(artistry, level);

  const eq = new Equipable({ name: "Armor" });
  return eq;
}

function createJewelry(subtype: string, artistry: number, level: number): Equipable {
  const equipSlot = _getJewelryEquipSlot(subtype);
  const value = _placeholderValueCalc(artistry, level);

  const eq = new Equipable({ name: "Jewelry" });
  return eq;
}

function createWeapon(subtype: string, artistry: number, level: number): Equipable {
  const equipSlot = _getWeaponEquipSlot(subtype);
  const value = _placeholderValueCalc(artistry, level);

  const eq = new Equipable({ name: "Weapon" });
  return eq;
}

export { createArmor, createJewelry, createWeapon };
