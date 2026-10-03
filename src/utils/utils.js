import { DAMAGE_AMOUNT, MAX_HEALTH, REVIVE_HEALTH } from "../constants/gameConstants.js";

export function sleep(ms, message) {
  if (message) console.log(message);

  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function handlePlayerChoice(choice, player, enemy) {
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


export function handleEnemyChoice(player, enemy) {
  const uilityChoice = calcualteHealthUtility(enemy);

  if (uilityChoice <= 0.5) {
    player.applyDamage(DAMAGE_AMOUNT);
  } else {
    enemy.applyHeal(REVIVE_HEALTH);
  }
}

function calcualteHealthUtility(enemy) {
  const health = enemy.getHealth() / MAX_HEALTH;
  return 1 - health;
}