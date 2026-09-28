import promptSync from "prompt-sync";

const prompt = promptSync();

let PLAYER_HEALTH = 100;
let ENEMY_HEALTH = 100;

const DELAY = 500;

const PLAYER_MESSAGE = "Attacking enemy";
const ENEMY_MESSAGE = "Attacking player";

const DAMAGE_AMOUNT = 10;
const REVIVE_HEALTH = 5;

const BAR_LENGTH = 15;
const MAX_HEALTH = 100;

// console.log(`
// ┌───────────────────────────────┐
// │         👹 ENEMY              │
// │                               │
// │ HP  ${enemyBar}  ${ENEMY_HEALTH} / ${max} │
// └───────────────────────────────┘
//              ⚔
// ┌───────────────────────────────┐
// │         🧙 YOU                │
// │                               │
// │ HP  ${playerBar}  ${PLAYER_HEALTH} / ${max} │
// └───────────────────────────────┘`);

function renderScore() {
  // update  hp bar
  const enemyPercentage = ENEMY_HEALTH / MAX_HEALTH;

  const enemyFilled = Math.round(enemyPercentage * BAR_LENGTH);
  const enemyEmpty = BAR_LENGTH - enemyFilled;

  const enemyBar = "█".repeat(enemyFilled) + "░".repeat(enemyEmpty);

  const playerPercentage = PLAYER_HEALTH / MAX_HEALTH;

  const filled = Math.round(playerPercentage * BAR_LENGTH);
  const playerEmpty = BAR_LENGTH - filled;

  const playerBar = "█".repeat(filled) + "░".repeat(playerEmpty);

  //Clear the terminal before render
  console.clear();

  //render the score board
  console.log(`
┌───────────────────────────────┐
│            ENEMY              │
│                               │
│ HP  ${enemyBar}  ${ENEMY_HEALTH} / ${MAX_HEALTH} │
└───────────────────────────────┘
             ⚔ 
┌───────────────────────────────┐
│            YOU                │
│                               │
│ HP  ${playerBar}  ${PLAYER_HEALTH} / ${MAX_HEALTH} │
└───────────────────────────────┘`);
}

function handleDeath() {
  if (ENEMY_HEALTH <= 0) {
    console.log(`
╔══════════════════════════════════════════════════════╗
║               🏆 VICTORY IS YOURS! 🏆                ║
╠══════════════════════════════════════════════════════╣
║  You defeated the Goblin and forged your legacy!     ║
╚══════════════════════════════════════════════════════╝
`);
    return true;
  }

  if (PLAYER_HEALTH <= 0) {
    console.log(`
╔══════════════════════════════════════════════════════╗
║                  💀 YOU DIED! 💀                     ║
╠══════════════════════════════════════════════════════╣
║  The Goblin overwhelmed you in battle...             ║
╚══════════════════════════════════════════════════════╝
`);
    return true;
  }

  return false;
}

function handlePlayerChoice(choice) {
  if (choice === "1") {
    ENEMY_HEALTH -= DAMAGE_AMOUNT;
    return true;
  } else if (choice === "2") {
    PLAYER_HEALTH += REVIVE_HEALTH;
    return true;
  } else {
    return false;
  }
}

function enemychoice() {
  let enemyChoice = Math.floor(Math.random() * 10) + 1;
  return enemyChoice;
}

function handleEnemyChoice(choice) {
  if (choice <= 5) {
    PLAYER_HEALTH -= DAMAGE_AMOUNT;
  } else if (choice > 5) {
    ENEMY_HEALTH += REVIVE_HEALTH;
  } else {
    // console.log("Enemy missed the attack");
  }
}

function sleep(ms, message) {
  if (message) console.log(message);

  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function game() {
  while (true) {
    //renders score after calculating health changes
    renderScore();

    //user input handiling
    const choice = prompt(`Select: (1) Attack (2) Revive (3) Exit : `);

    // Exit handiling
    if (choice === "exit" || choice === null || choice === "3") {
      break;
    }

    // clear screen handiling
    if (choice === "clear") {
      console.clear();
      continue;
    }

    // player choice handiling
    const isValidPlayerChoice = handlePlayerChoice(choice);

    if (!isValidPlayerChoice) {
      console.log("Invalid choice ! Please choose from the following ");
      continue;
    }

    renderScore();

    if (handleDeath()) {
      break;
    }

    await sleep(DELAY,PLAYER_MESSAGE);

    //Enemy choice
    let enemyChoice = enemychoice();
    handleEnemyChoice(enemyChoice);

    // Death handilding
    renderScore();

    if (handleDeath()) {
      break;
    }

    await sleep(DELAY, ENEMY_MESSAGE);
  }
}

game();
