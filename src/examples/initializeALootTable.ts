import { LootTable, LootPool, ArtistryPool } from "../loot/LootTable.js";

/*
 * A loot table is a mechanism that determines the loot or rewards a player can receive in Ashfalle,
 * often from actions like defeating enemies or opening containers.
 *
 * A new instance of a LootTable for an enemy or container.
 */
const lootTable = new LootTable();

/*
 * Three different loot pools are created: lootPoolCommon, lootPoolRare, and artistryPool. These
 * represent different categories of loot that a player can receive per roll.
 *
 * The LootPool constructor takes two arguments: a name for the loot pool and an empty array, intended
 * to hold any number of pre-defined items. The third argument for lootPoolCommon and lootPoolRare is
 * a number, representing the weight or probability of selecting an item from these pools.
 *
 * The ArtistryPool constructor takes a similar set of arguments, but the second argument is an empty
 * object, representing loot options that effect properties unique to artistry loot.
 */
const lootPoolCommon = new LootPool("Common Loot", [], 10);
const lootPoolRare = new LootPool("Rare Loot", [], 1);

const exampleOptions = {
  artistryRange: {
    min: 2,
    max: 4,
  },
  levelRange: {
    min: 1,
    max: null,
  },
  itemType: "armor",
};

const artistryPool = new ArtistryPool("Randomized Loot", exampleOptions, 100);

// Adds one or more loot pools to the loot table
lootTable.addLootPool(lootPoolCommon, lootPoolRare, artistryPool);

// Rolls zero or more items from the loot table
const droppedItems = lootTable.rollMultiple(3);
