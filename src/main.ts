import chalk from "chalk";

import setDefaultGameSettings from "./default/setDefaultGameSettings.js";
import { equipment, randomEquipment } from "./loot/generateArtistry.js";

(function main(): void {
  try {
    // set default game settings if the file does not exist
    const gameSettings = setDefaultGameSettings();

    if (gameSettings !== null) {
      const itemCloth = equipment.armor.cloth(gameSettings.lootOptions);
      const itemRandom = randomEquipment(gameSettings.lootOptions);
    } else {
      console.error(chalk.red("Game settings is null"));
    }

    //
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(err.stack));
    } else {
      console.error(chalk.red(err));
    }
  }
})();
