import * as chalk from "chalk";
import { Answers } from "../types/answers";
import botLog from "./botLog";
import botName from "./botName";
const Kahoot = require("kahoot.js-updated"); // no typings for this (deprecated) library :(

export default async function spawnClient(
  answers: Answers,
  i: number /* ,
  retries: number
  // [CHECK COMMENT BELOW \/]
  */
) {
  const id = i + 1;

  /* try {
    // [CHECK COMMENT BELOW \/]
    */
  botLog("Bot created.", id);
  const client = new Kahoot();

  botLog("Joining quiz.", id);
  client.join(answers.pin, botName(answers.bot_names, i));

  client.on("Joined", () => {
    botLog("Joined the quiz.", id);
  });

  client.on("QuizStart", () => {
    botLog("The quiz has started.", id);
  });

  client.on("QuestionStart", (question: any) => {
    botLog("Answering question randomly.", id);
    question.answer(Math.floor(Math.random() * 4));
  });

  client.on("QuizEnd", () => {
    botLog("The quiz has ended.", id);
  });
  /* } catch (err) {
    if (retries < answers.retries) {
      botLog(chalk.red("Failed to join, retrying."), id);
      spawnClient(answers, i, retries + 1);
    } else {
      botLog(chalk.red.bold("Failed to join too many times, quitting."), id);
    }

    // the library doesn't handle rejections properly so I can't make it retry automatically
    // for future maintainers: uncomment here, in durio.ts, and Answers.ts to make it work again if you find a better library
  } */
}
