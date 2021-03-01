import { BotName } from "./Names";

export type Answers = {
  pin: number;
  bot_amount: number;
  join_delay: number;
  /* retries: number; 
  // [CHECK COMMENT IN ./util/spawnClient.ts]
  */
  bot_names: BotName.FICTIVE_USERNAME | BotName.HUMAN_FIRST_NAMES | BotName.ID;
};
