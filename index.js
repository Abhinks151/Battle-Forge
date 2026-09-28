import promptSync from "prompt-sync";

const prompt = promptSync();

let playerHealth = 100;
let enemyHealth = 100;

let damageAmount = 10;
let reviveHealth = 5;

const barLength = 15;
const max = 100;

// console.log(`
// ┌───────────────────────────────┐
// │         👹 ENEMY              │
// │                               │
// │ HP  ${enemyBar}  ${enemyHealth} / ${max} │
// └───────────────────────────────┘
//              ⚔
// ┌───────────────────────────────┐
// │         🧙 YOU                │
// │                               │
// │ HP  ${playerBar}  ${playerHealth} / ${max} │
// └───────────────────────────────┘`);

while (true) {
  // update  hp bar
  const enemyPercentage = enemyHealth / max;

  const enemyFilled = Math.round(enemyPercentage * barLength);
  const enemyEmpty = barLength - enemyFilled;

  const enemyBar = "█".repeat(enemyFilled) + "░".repeat(enemyEmpty);

  const playerPercentage = playerHealth / max;

  const filled = Math.round(playerPercentage * barLength);
  const playerEmpty = barLength - filled;

  const playerBar = "█".repeat(filled) + "░".repeat(playerEmpty);

  //Clear the terminal before render
  console.clear();

  //render the score board
  console.log(`
┌───────────────────────────────┐
│            ENEMY              │
│                               │
│ HP  ${enemyBar}  ${enemyHealth} / ${max} │
└───────────────────────────────┘
             ⚔ 
┌───────────────────────────────┐
│            YOU                │
│                               │
│ HP  ${playerBar}  ${playerHealth} / ${max} │
└───────────────────────────────┘`);

  const choice = prompt(`Select: (1) Attack (2) Revive (3) Exit : `);

  // Exit handiling
  if (choice === "exit" || choice === null) {
    break;
  }

  // clear screen handiling
  if (choice === "clear") {
    console.clear();
    continue;
  }

  // player choice handiling
  if (choice === "1") {
    enemyHealth -= damageAmount;
  } else if (choice === "2") {
    playerHealth += reviveHealth;
  } else {
    console.log("Invalid choice");
    continue;
  }

  //Enemy choice
  let enemyChoice = Math.floor(Math.random() * 10) + 1;
  if (enemyChoice < 5) {
    playerHealth -= damageAmount;
  } else if (enemyChoice > 5) {
    enemyHealth += reviveHealth;
  } else {
    // console.log("Enemy missed the attack");
  }

  // Death handilding
  if (enemyHealth <= 0) {
    console.log(`
╔══════════════════════════════════════════════════════╗
║               🏆 VICTORY IS YOURS! 🏆                ║
╠══════════════════════════════════════════════════════╣
║  You defeated the Goblin and forged your legacy!     ║
╚══════════════════════════════════════════════════════╝
`);
    break;
  }

  if (playerHealth <= 0) {
    console.log(`
╔══════════════════════════════════════════════════════╗
║                  💀 YOU DIED! 💀                     ║
╠══════════════════════════════════════════════════════╣
║  The Goblin overwhelmed you in battle...             ║
╚══════════════════════════════════════════════════════╝
`);
    break;
  }
}
