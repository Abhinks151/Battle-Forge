// let flag = 1;
// while(flag){
    
// }



const barLength = 15;
const healt = 70;
const max = 100;


const percentage = healt / max;

const filled = Math.round(percentage * barLength);
const empty = barLength - filled;

const bar = "█".repeat(filled) + "░".repeat(empty);

console.log(`
┌───────────────────────────────┐
│         👹 ENEMY              │
│                               │
│ HP  ${bar}  ${healt} / ${max} │
└───────────────────────────────┘
             ⚔ 
┌───────────────────────────────┐
│         🧙 YOU                │
│                               │
│ HP  ${bar}  ${healt} / ${max} │
└───────────────────────────────┘`);


// ⚔