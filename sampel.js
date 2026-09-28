// function render(playerX, enemyX) {
//   console.clear();

//   const gap = " ".repeat(Math.max(1, enemyX - playerX - 2));

//   console.log(`
// ╔═══════════════════════════════════╗
// ║          BATTLEFORGE              ║
// ╠═══════════════════════════════════╣
// ║                                   ║
// ║  Knight${" ".repeat(20)}Goblin    ║
// ║  ${" ".repeat(playerX)}🧑${gap}👹 ║
// ║  HP ████████      HP █████        ║
// ║                                   ║
// ║        ⚔️                         ║
// ║                                   ║
// ╚═══════════════════════════════════╝
// `);
// }

// // Game state
// let playerX = 2;
// const enemyX = 18;

// // Game loop
// const interval = setInterval(() => {
//   render(playerX, enemyX);

//   playerX++;

//   if (playerX >= enemyX - 2) {
//     playerX = 2;
//     render(playerX, enemyX);
//     clearInterval(interval);
//   }
// }, 200);

// for(let i = 0;i<5;i++){
//     console.log("hello");
// }

// import readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Enter your name: ', (name) => {
//     console.log(`You entered: ${name}`);
//     rl.close();
// });




import promptSync from "prompt-sync";

const prompt = promptSync();

let playerHealth = 100;
let enemyHealth = 100;

let damageAmount = 10;
let reviveHealth = 5;



while (true) {
  console.log(`Your health is ${playerHealth}`);
  console.log(`Enemy health is ${enemyHealth}`);

  const choice = prompt(`Select: (1) Attack (2) Revive (3) Exit : `);
  if (choice === "exit" || choice === null) {
    break;
  }

  if (choice === "clear") {
    console.clear();
    continue;
  }

  if (choice === "1") {
    enemyHealth -= damageAmount;
    console.log("You attacked enimy with ", damageAmount, " damage");
  } else if (choice === "2") {
    playerHealth += reviveHealth;
    console.log("You revived with ", reviveHealth, " health");
  } else {
    console.log("Invalid choice");
    continue;
  }

  console.log("Enimy is attacking you");
  let enemyChoice = Math.floor(Math.random() * 10) + 1;
  if (enemyChoice < 5) {
    playerHealth -= damageAmount;
    console.log(`You are hitted by ${damageAmount} damage`);
  } else if (enemyChoice > 5) {
    enemyHealth += reviveHealth;
    console.log("Enemy revived with ", reviveHealth, " health");
  } else {
    console.log("Enemy missed the attack");
  }

  if (playerHealth <= 0) {
    console.log("You are dead");
    break;
  }

  if (enemyHealth <= 0) {
    console.log("Enemy is dead");
    break;
  }
}
