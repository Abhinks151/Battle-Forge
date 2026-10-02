import promptSync from "prompt-sync";
import Character from "./models/Character.js";
import { renderScore } from "./ui/renderScore.js";
import { handleDeath } from "./game/handleDeath.js";
import { sleep } from "./utils/utils.js";

const prompt = promptSync();

const MAX_HEALTH = 100;

const player = new Character("Abhin", MAX_HEALTH);
const enemy = new Character("Archer", MAX_HEALTH);

const DELAY = 500;

const PLAYER_MESSAGE = "Attacking enemy";
const ENEMY_MESSAGE = "Attacking player";

const DAMAGE_AMOUNT = 10;
const REVIVE_HEALTH = 5;

function handlePlayerChoice(choice) {
  if (choice === "1") {
    enemy.applyDamage(DAMAGE_AMOUNT);
    return true;
  } else if (choice === "2") {
    player.applyHeal(REVIVE_HEALTH);
    return true;
  } else {
    return false;
  }
}


function handleEnemyChoice() {
  const uilityChoice = calcualteHealthUtility();

  if (uilityChoice <= 0.5) {
    player.applyDamage(DAMAGE_AMOUNT);
  } else {
    enemy.applyHeal(REVIVE_HEALTH);
  }
}

function calcualteHealthUtility() {
  const health = enemy.getHealth() / MAX_HEALTH;
  return 1 - health;
}

async function game() {
  while (true) {
    // renders score after calculating health changes
    renderScore(player, enemy);

    // user input handling
    const choice = prompt(`Select: (1) Attack (2) Revive (3) Exit : `);

    // Exit handling
    if (choice === "exit" || choice === null || choice === "3") {
      break;
    }

    // clear screen handling
    if (choice === "clear") {
      console.clear();
      continue;
    }

    // player choice handling
    const isValidPlayerChoice = handlePlayerChoice(choice);

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
    handleEnemyChoice();

    // Death handling
    renderScore(player, enemy);

    if (handleDeath(player, enemy)) {
      break;
    }

    await sleep(DELAY, ENEMY_MESSAGE);
  }
}

game();
