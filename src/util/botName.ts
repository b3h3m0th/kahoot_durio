import { BotName } from "../types/Names";
const Chance = require("chance");
import {
  uniqueNamesGenerator,
  names,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export default (botName: BotName) => {
  if (botName === BotName.FICTIVE_USERNAME) {
    return uniqueNamesGenerator({
      dictionaries: [animals, adjectives, colors, names],
      separator: " ",
      length: 3,
    });
  } else if (botName === BotName.HUMAN_FIRST_NAMES) {
    return new Chance().first();
  }
};
