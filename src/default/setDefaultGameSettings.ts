/**
 * This module provides a function to initialize the game settings by creating a
 * default settings file if it doesn't exist. The default settings are a combination
 * of settings from `../default/*.json`.
 */

import chalk from "chalk";
import fs from "fs";
import path from "path";

import defaultGame from "./defaultGame.json" assert { type: "json" };
import defaultLootOptions from "./defaultLootOptions.json" assert { type: "json" };

const settingsPath = path.join(".", "out", "settings");
const fileName = "gameSettings.json";

const defaultGameSettings = { ...defaultGame, ...defaultLootOptions };

/**
 * Creates a default game settings file if it doesn't exist, using the combined settings
 * from `../default/*.json`.
 *
 * @remarks
 * The settings file is created in the `settings` directory and named `gameSettings.json`.
 * If the file already exists, no changes are made.
 */
function setDefaultGameSettings(): GameSettings | null {
  try {
    const filePath = path.join(settingsPath, fileName);

    if (!fs.existsSync(filePath)) {
      // file does not exist, create the subdirectory and file
      fs.mkdirSync(settingsPath, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(defaultGameSettings));

      console.log(chalk.cyan(`'${fileName}' created with default settings`));
    }

    return defaultGameSettings;
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(`Error creating ${fileName}:`, err.message));
    } else {
      console.error(chalk.red(`Error creating ${fileName}:`, err));
    }

    return null;
  }
}

interface GameSettings {
  game: any;
  lootOptions: any;
  // other properties...
}

export default setDefaultGameSettings;
