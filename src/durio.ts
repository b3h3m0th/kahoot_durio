import { BotName } from "./types/Names";

import * as Inquirer from "inquirer";
import * as chalk from "chalk";
import sleep from "./util/sleep";
import { Answers } from "./types/answers";
import spawnClient from "./util/spawnClient";

try {
  Inquirer.prompt([
    {
      type: "input",
      name: "pin",
      message: "Kahoot Game Pin",
      validate: async (input: any) =>
        !isNaN(input) ? true : "Please enter a valid Pin",
    },
    {
      type: "input",
      name: "bot_amount",
      message: "Amount of bots (50 - 100 recommended)",
      validate: async (input: any) =>
        !isNaN(input) ? true : "Please enter a valid Number",
    },
    {
      type: "input",
      name: "join_delay",
      message: "Delay between joins in ms (500 recommended)",
      validate: async (input: any) =>
        !isNaN(input) ? true : "Please enter a valid Number",
    },
    {
      type: "list",
      name: "bot_names",
      message: "Choose a type of name for your bots",
      choices: [...Object.values(BotName)],
    },
  ]).then(async (answers: Answers) => {
    for (let i = 0; i < answers.bot_amount; i++) {
      spawnClient(
        answers,
        i /* , 0
        // [CHECK COMMENT IN ./util/spawnClient.ts]
        */
      );
      await sleep(answers.join_delay);
    }
  });
} catch (err) {
  console.log(chalk.red.bold("An error has occured."), err);
}
