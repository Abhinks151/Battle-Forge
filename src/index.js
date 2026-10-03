import promptSync from "prompt-sync";
import Character from "./models/Character.js";
import { renderScore } from "./ui/renderScore.js";
import { handleDeath } from "./game/handleDeath.js";
import { handleEnemyChoice, handlePlayerChoice, sleep } from "./utils/utils.js";
import {
  DELAY,
  ENEMY_MESSAGE,
  MAX_HEALTH,
  PLAYER_MESSAGE,
} from "./constants/gameConstants.js";

const prompt = promptSync();


const player = new Character("Abhin", MAX_HEALTH);
const enemy = new Character("Archer", MAX_HEALTH);


async function game() {
  while (true) {
    // renders score after calculating health changes
    renderScore(player, enemy);

    // user input handling
    console.log(`
┌───────────────┐  ┌───────────────┐  
│    Attack     │  │     Heal      │
│   --------    │  │    ------     │
│   Damage -10  │  │    Heal +5    │
│   (Choose 1)  │  │   (Choose 2)  │
└───────────────┘  └───────────────┘
    `);

    const choice = prompt(`Select move: 1, 2, or 3(Exit) : `);

    // Exit handling
    if (choice === "exit" || choice === null || choice === "3") {
      break;
    } else if (choice === "clear") {
      // clear screen handling
      console.clear();
      continue;
    }

    // player choice handling
    const isValidPlayerChoice = handlePlayerChoice(choice, player, enemy);

    if (!isValidPlayerChoice) {
      console.log("Invalid choice ! Please choose from the following ");
      continue;
    }

    renderScore(player, enemy);

    if (handleDeath(player, enemy)) {
      break;
    }

    await sleep(DELAY, PLAYER_MESSAGE);

    // Enemy choice
    handleEnemyChoice(player, enemy);

    // Death handling
    renderScore(player, enemy);

    if (handleDeath(player, enemy)) {
      break;
    }

    await sleep(DELAY, ENEMY_MESSAGE);
  }
}

game();
