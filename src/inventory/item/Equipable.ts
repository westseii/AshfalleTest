import chalk from "chalk";

import { EquipableOptions } from "../../types/options.js";
import { EquipSlot } from "../../enums/slots.js";
import { Item, ItemCategory } from "../item/Item.js";

/**
 * Represents an equipable item.
 */
class Equipable extends Item {
  #equipSlot: EquipSlot = EquipSlot.ONE_HANDED;
  #isArtistryItem: boolean = true;
  #artistry: number | null = 3;
  #level: number = 1;

  constructor(equipableOptions?: EquipableOptions) {
    super({ ...equipableOptions, category: ItemCategory.EQUIPABLE });
    this.#setEquipableOptions(equipableOptions); // override defaults with optional arguments
  }

  //
  // getters/setters and validation

  get equipSlot(): EquipSlot {
    return this.#equipSlot;
  }
  set equipSlot(slot: EquipSlot) {
    this.#equipSlot = slot;
  }

  get isArtistryItem(): boolean {
    return this.#isArtistryItem;
  }
  set isArtistryItem(bool: boolean) {
    this.#isArtistryItem = bool;
    this.artistry = this.#artistry; // re-validate artistry
  }

  get artistry(): number | null {
    return this.#artistry;
  }
  set artistry(artistry: number | null) {
    if (this.#isArtistryItem && typeof artistry === "number") {
      this.#artistry = Math.min(Math.max(artistry, 1), 5);
    } else {
      this.#artistry = null;
    }
  }

  get level(): number {
    return this.#level;
  }
  set level(value: number) {
    this.#level = Math.max(1, value);
  }

  //
  // equipable functions

  #setEquipableOptions(equipableOptions: EquipableOptions = {}): void {
    const args = { ...equipableOptions };

    this.equipSlot = args.equipSlot ?? this.equipSlot;
    this.isArtistryItem = args.isArtistryItem ?? this.isArtistryItem;
    this.artistry = args.artistry ?? this.artistry;
    this.level = args.level ?? this.level;
  }

  //
  // informational

  toString(asQuantity = true): string {
    const artistry = chalk.yellow(this.artistry?.toString() ?? "n/a"); // TODO: null artistry
    const level = chalk.yellow(this.level.toString());

    return `${super.toString(asQuantity)} Art: ${artistry} Lv: ${level}`;
  }
}

export { Equipable, EquipSlot };
