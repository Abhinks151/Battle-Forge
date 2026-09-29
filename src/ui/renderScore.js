const BAR_LENGTH = 15;
const MAX_HEALTH = 100;
const BOX_WIDTH = 31;

function centerText(text, width) {
  const totalPadding = width - text.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;

  return " ".repeat(leftPadding) + text + " ".repeat(rightPadding);
}

function createHealthBar(health) {
  const percentage = health / MAX_HEALTH;
  const filled = Math.round(percentage * BAR_LENGTH);
  const empty = BAR_LENGTH - filled;

  return "█".repeat(filled) + "░".repeat(empty);
}

function createHPLine(character) {
  const healthBar = createHealthBar(character.getHealth());
  const healthText = String(character.getHealth()).padStart(3);
  const content = `HP  ${healthBar}  ${healthText} / ${MAX_HEALTH}`;

  return content.padEnd(BOX_WIDTH);
}

export function renderScore(player, enemy) {
  const enemyName = centerText(enemy.getName(), BOX_WIDTH);
  const playerName = centerText(player.getName(), BOX_WIDTH);

  const enemyHP = createHPLine(enemy);
  const playerHP = createHPLine(player);

  console.clear();

  console.log(`
┌───────────────────────────────┐
│${enemyName}│
│                               │
│${enemyHP}│
└───────────────────────────────┘
             ⚔
┌───────────────────────────────┐
│${playerName}│
│                               │
│${playerHP}│
└───────────────────────────────┘`);
}
