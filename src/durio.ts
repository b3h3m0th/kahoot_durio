import { BotName } from "./types/Names";

const Kahoot = require("kahoot.js-updated");
const Inquirer = require("inquirer");
const chalk = require("chalk");
import botName from "./util/botName";

const clients: any[] = [];

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
      message: "Amount of bots",
      validate: async (input: any) =>
        !isNaN(input) ? true : "Please enter a valid Number",
    },
    {
      type: "list",
      name: "bot_names",
      message: "Choose a type of name for your bots",
      choices: [...Object.values(BotName)],
    },
  ]).then((answers: any) => {
    for (let i = 0; i < answers.bot_amount; i++) {
      setTimeout(() => {
        console.clear();
        clients.push(new Kahoot());
        clients[i].join(answers.pin, botName(answers.bot_names, i));
        console.log(chalk.green.bold(`Successfully injected bots: ${i + 1}`));
      }, 50);
    }
  });
} catch (err) {
  console.log(
    chalk.red.bold(
      "Something has gone wrong...\nMaybe try using a smaller amount of bots"
    )
  );
}
