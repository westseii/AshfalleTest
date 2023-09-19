import { EquipSlot } from "../enums/slots.js";
import { ItemCategory } from "../enums/categories.js";

/**
 * Represents optional configuration for a Loot Table.
 */
type LootOptions = {
  artistryRange?: {
    min: number;
    max: number;
  };
  levelRange?: {
    min: number;
    max: number | null;
  };
  itemType?: string;
};

/**
 * Represents applied Loot Options.
 */
type AppliedLootOptions = {
  artistry: number;
  level: number;
};

/**
 * Represents optional configuration for an Item.
 */
type ItemOptions = Partial<{
  name: string;
  category: ItemCategory;

  burden: number;
  value: number;

  maxQuantity: number;
  quantity: number;
}>;

/**
 * Represents optional configuration for an Equipable.
 */
type EquipableOptions = Partial<{
  name: string;
  category: ItemCategory;

  burden: number;
  value: number;

  maxQuantity: number;
  quantity: number;

  equipSlot: EquipSlot;
  isArtistryItem: boolean;
  artistry: number;
  level: number;
}>;

/**
 * Represents optional configuration for an Experience Chart.
 */
type ExperienceChartOptions = Partial<{
  skillCap: number;
  incrementRamp: number;
  lowerAdjust: number;
}>;

export { LootOptions, AppliedLootOptions, ItemOptions, EquipableOptions, ExperienceChartOptions };
