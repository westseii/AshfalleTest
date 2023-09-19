import chalk from "chalk";

import { ItemCategory } from "../../enums/categories.js";
import { ItemOptions } from "../../types/options.js";

/**
 * Represents an inventory item.
 */
class Item {
  /** The name of the item. */
  #name = "Unnamed Item";
  /** The category of the item. */
  #category = ItemCategory.GENERAL;

  /** The burden (weight) of the item. */
  #burden = 0.1;
  /** The raw value of the item. */
  #value = 1;

  /** The maximum quantity of this item that can be stacked together. */
  #maxQuantity = 1;
  /** The current quantity of the item. */
  #quantity = 1;

  /**
   * Constructs a new Item instance with the given options (if provided).
   * @param itemOptions - The item options to override the default properties.
   */
  constructor(itemOptions?: ItemOptions) {
    this.#setItemOptions(itemOptions); // override defaults with optional arguments
  }

  //
  // getters/setters and validation

  get name(): string {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }

  get category(): ItemCategory {
    return this.#category;
  }
  set category(category: ItemCategory) {
    this.#category = category;
  }

  get burden(): number {
    return this.#burden;
  }
  get burdenQuantity(): number {
    return this.#burden * this.#quantity;
  }
  set burden(burden: number) {
    this.#burden = Math.max(0, burden);
  }

  get value(): number {
    return this.#value;
  }
  get valueQuantity(): number {
    return this.#value * this.#quantity;
  }
  set value(value: number) {
    this.#value = Math.max(0, value);
  }

  get maxQuantity(): number {
    return this.#maxQuantity;
  }
  set maxQuantity(maxQuantity: number) {
    this.#maxQuantity = Math.max(1, maxQuantity);
    this.quantity = this.#quantity; // re-validate quantity
  }

  get quantity(): number {
    return this.#quantity;
  }
  set quantity(quantity: number) {
    this.#quantity = Math.min(this.maxQuantity, Math.max(1, quantity)); // cap quantity at maxQuantity
  }

  //
  // item functions

  #setItemOptions(itemOptions: ItemOptions = {}): void {
    const args = { ...itemOptions };

    this.name = args.name ?? this.name;
    this.category = args.category ?? this.category;

    this.burden = args.burden ?? this.burden;
    this.value = args.value ?? this.value;

    this.maxQuantity = args.maxQuantity ?? this.maxQuantity; // set before quantity to ensure proper quantity validation
    this.quantity = args.quantity ?? this.quantity;
  }

  #getValueArray(value: number): Array<number> {
    const gold = Math.floor(value / 10000);
    const silver = Math.floor((value % 10000) / 100);
    const copper = Math.floor(value % 100);

    return [gold, silver, copper];
  }

  getValueArray(): Array<number> {
    return this.#getValueArray(this.value);
  }

  getValueQuantityArray(): Array<number> {
    return this.#getValueArray(this.valueQuantity);
  }

  //
  // informational

  toString(asQuantity = true): string {
    const name = chalk.green(this.name);
    const category = chalk.magenta(this.category);
    let valueString = (asQuantity ? this.getValueQuantityArray() : this.getValueArray()).join(".");
    valueString = chalk.yellow(valueString);

    return `${name} ${category} ${asQuantity ? "valueQuantity:" : "value:"} ${valueString}`;
  }
}

export { Item, ItemCategory };
