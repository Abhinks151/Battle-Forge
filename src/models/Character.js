class Character {
  #name;
  #health;

  constructor(name, health) {
    this.#name = name;
    this.#health = health;
  }

  applyDamage(amount) {
    this.#health -= amount;
    if (this.#health < 0) this.#health = 0;
  }

  applyHeal(amount) {
    this.#health += amount;
    if (this.#health > 100) this.#health = 100;
  }

  getHealth() {
    return this.#health;
  }

  getName() {
    return this.#name;
  }
}

export default Character;
