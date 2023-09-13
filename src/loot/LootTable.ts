import { Item } from "../inventory/item/Item.js";

/**
 * Represents a loot table containing various loot pools.
 */
class LootTable {
  #lootPools: Array<ALootPool>;
  #chances: Array<number>;
  #nothingChance: number;

  /**
   * Constructs a LootTable with an optional chance of no item being dropped.
   * @param nothingChance - Optional. A number between 0 and 1 representing the chance of nothing being dropped.
   */
  constructor(nothingChance?: number) {
    this.#lootPools = [];
    this.#chances = [];
    this.#nothingChance = nothingChance || 0.7;
  }

  /**
   * Adds one or more loot pools to the loot table.
   * @param lootPools - A spread array of ALootPool instances to add to the loot table.
   */
  addLootPool(...lootPools: Array<ALootPool>): void {
    lootPools.forEach((lootPool) => {
      this.#lootPools.push(lootPool);
      this.#chances.push(lootPool.weight);
    });
  }

  /**
   * Rolls for a loot pool item and returns the loot pool or null if nothing is dropped.
   * @returns An ALootPool instance or null.
   */
  #roll(): ALootPool | null {
    // generate a random number between 0 and 1
    let roll = Math.random();

    // check if nothing was dropped
    if (roll < this.#nothingChance) {
      return null;
    }

    // calculate the total drop chance for all items in the loot table
    let totalChance = 0;
    let cumulativeChances = [];
    for (let i = 0; i < this.#chances.length; i++) {
      totalChance += this.#chances[i];
      cumulativeChances.push(totalChance);
    }

    // generate a random number between 0 and the total drop chance
    roll = Math.random() * totalChance;

    // find the first item whose cumulative drop chance is greater than or equal to the random number
    for (let i = 0; i < cumulativeChances.length; i++) {
      if (roll <= cumulativeChances[i]) {
        return this.#lootPools[i];
      }
    }

    // if no item was found, return null
    return null;
  }

  /**
   * Rolls the loot table multiple times and returns an array of dropped items.
   * @param numberOfRolls - Optional. The number of times the loot table should be rolled.
   * @returns An array of Item instances.
   */
  rollMultiple(numberOfRolls?: number): Array<Item> {
    numberOfRolls = numberOfRolls || 3;

    let droppedItems = [];
    for (let i = 0; i < numberOfRolls; i++) {
      let lootPool = this.#roll();
      if (lootPool) {
        droppedItems.push(lootPool.getItem());
      }
    }
    return droppedItems;
  }
}

/**
 * An abstract class representing a loot pool, which can be extended to create various types of loot pools.
 */
abstract class ALootPool {
  #name: string;
  #weight: number;

  /**
   * Constructs an ALootPool with a name and optional weight.
   * @param name - The name of the loot pool.
   * @param weight - Optional. The weight of the loot pool.
   */
  constructor(name: string, weight?: number) {
    this.#name = name;
    this.#weight = weight || 1;
  }

  get name(): string {
    return this.#name;
  }

  get weight(): number {
    return this.#weight;
  }

  /**
   * An abstract method that should be implemented in derived classes to return an item from the loot pool.
   * @returns An Item instance.
   */
  abstract getItem(): Item;
}

/**
 * Represents a simple loot pool with a set of items.
 */
class LootPool extends ALootPool {
  #lootPool: Array<Item>;

  /**
   * Constructs a LootPool with a name, an array of items, and an optional weight.
   * @param name - The name of the loot pool.
   * @param lootPool - An array of Item instances.
   * @param weight - Optional. The weight of the loot pool.
   */
  constructor(name: string, lootPool: Array<Item>, weight?: number) {
    super(name, weight);
    this.#lootPool = lootPool;
  }

  /**
   * Returns a random item from the loot pool.
   * @returns An Item instance.
   */
  getItem(): Item {
    return this.#lootPool[Math.floor(Math.random() * this.#lootPool.length)];
  }
}

/**
 * Represents an artistry loot pool with a set of customizable loot options.
 */
class ArtistryPool extends ALootPool {
  #lootOptions: object;

  /**
   * Constructs an ArtistryPool with a name, a loot options object, and an optional weight.
   * @param name - The name of the artistry pool.
   * @param lootOptions - An object representing the loot options.
   * @param weight - Optional. The weight of the artistry pool.
   */
  constructor(name: string, lootOptions: object, weight?: number) {
    super(name, weight);
    this.#lootOptions = lootOptions;
  }

  /**
   * Returns a new item based on the artistry loot options.
   * @returns An Item instance.
   */
  getItem(): Item {
    return new Item(); // TODO: artistry
  }
}

export { LootTable, LootPool, ArtistryPool };
