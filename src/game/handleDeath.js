export function handleDeath(player, enemy) {
  if (enemy.getHealth() <= 0) {
    console.log(`
╔══════════════════════════════════════════════════════╗
║               🏆 VICTORY IS YOURS! 🏆                ║
╠══════════════════════════════════════════════════════╣
║  You defeated the Goblin and forged your legacy!     ║
╚══════════════════════════════════════════════════════╝
`);
    return true;
  }

  if (player.getHealth() <= 0) {
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
